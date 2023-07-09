import { config } from "./utilities/config";
import { commands } from "./commands";
import { client } from "./utilities/config";
import { populateCaches } from "./utilities/populateCache";
import roleCommandCache from "./cache/roleCommandCache";

// Setup bot
client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    // Populate caches
    await populateCaches();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) {
        return;
    }
    const { commandName } = interaction;

    // Get the user roles from the interaction
    let memberRoles: string[] = [];
    if ('cache' in interaction.member!.roles) {
        memberRoles = interaction.member?.roles.cache.map(role => role.id) || [];
    }

    // Check if user can execute the command
    const hasPermission = memberRoles?.some(roleId => {
        const roleCommands = roleCommandCache.get(roleId);
        return roleCommands && (roleCommands.includes(commandName) || roleCommands.includes('All'));
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

client.login(config.DISCORD_TOKEN);