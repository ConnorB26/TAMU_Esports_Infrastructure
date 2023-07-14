import { config } from "./utilities/config";
import { commands } from "./commands";
import { client } from "./utilities/config";
import { populateCaches } from "./utilities/populateCache";
import roleCommandCache from "./cache/roleCommandCache";
import { startTwitchPolling } from "./services/twitchService";
import { CommandInteractionOptionResolver, GuildMember } from "discord.js";
import { removeMembership } from "./utilities/membership";
import { unregisterUser } from "./utilities/users";

// Setup bot
client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    // Populate caches
    await populateCaches();

    // Start twitch polling
    startTwitchPolling();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) {
        return;
    }

    const commandName = interaction.commandName;
    let fullCommandName = commandName;

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
        await interaction.reply('You do not have permission to execute this command.');
        return;
    }

    // Execute command
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

// Clear up data of anyone who has been kicked/banned/left the main server
client.on('guildMemberRemove', async member => {
    if (member.guild.id !== config.DISCORD_GUILD_ID) {
        return;
    }

    await removeMembership(member.guild, member as GuildMember);
    await unregisterUser(member.id);
});

client.login(config.DISCORD_TOKEN);