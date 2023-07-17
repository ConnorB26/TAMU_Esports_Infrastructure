import { config, rateLimit } from "./utilities/config";
import { commands } from "./commands";
import { client } from "./utilities/config";
import { populateCaches } from "./utilities/populateCache";
import roleCommandCache from "./cache/roleCommandCache";
import { startTwitchPolling } from "./services/twitchService";
import { CommandInteractionOptionResolver, Events, GuildMember } from "discord.js";
import { removeMembership } from "./utilities/membership";
import { unregisterUser } from "./utilities/users";

// Setup bot
client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    // Populate caches
    await populateCaches();

    // Start twitch polling
    startTwitchPolling();
});

const userCommandTimestamps = new Map<string, number[]>();
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) {
        return;
    }

    const commandName = interaction.commandName;
    let fullCommandName = commandName;
    const userId = interaction.user.id;

    // Check if there's a subcommand group
    const opts = interaction.options as CommandInteractionOptionResolver;
    if (opts.getSubcommandGroup(false)) {
        fullCommandName += ` ${opts.getSubcommandGroup()}`;
    }

    // Check if there's a subcommand
    if (opts.getSubcommand(false)) {
        fullCommandName += ` ${opts.getSubcommand()}`;
    }

    // Get the user roles from the interaction
    let memberRoles: string[] = [];
    if ('cache' in interaction.member!.roles) {
        memberRoles = interaction.member?.roles.cache.map(role => role.id) || [];
    }

    // Check if user can execute the command
    const hasPermission = memberRoles?.some(roleId => {
        const roleCommands = roleCommandCache.get(roleId);
        return roleCommands && (roleCommands.includes(fullCommandName) || roleCommands.includes(`${commandName} *`) || roleCommands.includes('All'));
    });

    if (!hasPermission) {
        await interaction.reply({ ephemeral: true, content: 'You do not have permission to execute this command.' });
        return;
    }

    // Rate limit
    const now = Date.now();
    const timestamps = userCommandTimestamps.get(userId) || [];

    const rateLimitWindowMillis = rateLimit.minutes * 60 * 1000;
    const relevantTimestamps = timestamps.filter(ts => now - ts < rateLimitWindowMillis);

    if (relevantTimestamps.length >= rateLimit.commands) {
        const timeLeft = ((relevantTimestamps[0] + rateLimitWindowMillis - now) / 1000).toFixed(0);
        await interaction.reply({ ephemeral: true, content: `You are trying to execute too many commands in a short time. Please wait ${timeLeft} seconds before trying again.` });
        return;
    }

    // Execute command
    if (commands[commandName as keyof typeof commands]) {
        relevantTimestamps.push(now);
        userCommandTimestamps.set(userId, relevantTimestamps);

        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

// Clear up data of anyone who has been kicked/banned or has left the main server
client.on(Events.GuildMemberRemove, async member => {
    if (member.guild.id !== config.DISCORD_GUILD_ID) {
        return;
    }

    await removeMembership(member.guild, member as GuildMember);
    await unregisterUser(member.id);
});

// Handle reserve modal submissions
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;

    const startTimeStr = interaction.fields.getTextInputValue('startTimeInput');
    const endTimeStr = interaction.fields.getTextInputValue('endTimeInput');

    console.log(startTimeStr);
    console.log(endTimeStr);
});

client.login(config.DISCORD_TOKEN);