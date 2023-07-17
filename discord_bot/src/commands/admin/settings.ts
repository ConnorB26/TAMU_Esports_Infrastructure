import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import DiscordSettingCache from '../../cache/discordSettingCache';
import { update as updateSetting } from '../../services/discordSettingService';

export const data = new SlashCommandBuilder()
    .setName("settings")
    .setDescription("Get or update settings")
    .addSubcommand(subcommand =>
        subcommand.setName('get')
            .setDescription('Get all settings or a specific setting')
            .addStringOption(option =>
                option.setName('setting_name')
                    .setDescription('Name of the setting to get')
                    .setRequired(false)))
    .addSubcommand(subcommand =>
        subcommand.setName('update')
            .setDescription('Update a setting')
            .addStringOption(option =>
                option.setName('setting_name')
                    .setDescription('Name of the setting to update')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('new_value')
                    .setDescription('New value for the setting')
                    .setRequired(true)));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    
    const opts = interaction.options as CommandInteractionOptionResolver;

    if (opts.getSubcommand() === 'get') {
        const settingName = opts.getString('setting_name');
        if (settingName) {
            const settingValue = DiscordSettingCache.get(settingName);
            return interaction.editReply(`Setting ${settingName} is ${settingValue}`);
        } else {
            const allSettings = DiscordSettingCache.getAll();
            return interaction.editReply(`All settings: ${JSON.stringify(allSettings)}`);
        }
    } else if (opts.getSubcommand() === 'update') {
        const settingName = opts.getString('setting_name')!;
        const newValue = opts.getString('new_value') ?? "";
        try {
            await updateSetting(settingName, { name: settingName, value: newValue });
            DiscordSettingCache.update(settingName, newValue);
            return interaction.editReply(`Updated setting ${settingName} to ${newValue}`);
        } catch (error) {
            console.error(error);
            return interaction.editReply(`Failed to update setting ${settingName}`);
        }
    }
}