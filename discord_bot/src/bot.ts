import { config } from "./utilities/config";
import { commands } from "./commands";
import { client } from "./utilities/config";
import * as discordSettingService from './services/discordSettingService';
import * as roleCommandService from './services/roleCommandService';
import DiscordSettingCache from "./cache/discordSettingCache";
import RoleCommandCache from "./cache/roleCommandCache";

// Cache instances
const settings = new DiscordSettingCache();
const permissions = new RoleCommandCache();

// Setup bot
client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    // Populate discordSettingCache
    const settingsRes = await discordSettingService.findAll();
    settings.populate(settingsRes);

    // Populate roleCommandCache
    const roleCommands = await roleCommandService.findAll();
    permissions.populate(roleCommands);
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
    console.log(memberRoles);
    console.log(permissions);

    const hasPermission = memberRoles?.some(roleId => {
        const num = BigInt(roleId);
        console.log(num);
        const roleCommands = permissions.get(num);
        return roleCommands && (roleCommands.includes(commandName) || roleCommands.includes('All'));
    });

    if (!hasPermission) {
        await interaction.reply('You do not have permission to execute this command.');
        return;
    }

    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});


client.login(config.DISCORD_TOKEN);