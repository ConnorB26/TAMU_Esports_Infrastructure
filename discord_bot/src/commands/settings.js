const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Commands for updating settings related to Discord')
        .addSubcommand(subcommand =>
            subcommand.setName('update_reset_date').setDescription('Update the reset date')
                .addStringOption(option => option.setName('date').setDescription('New reset date').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('update_member_role').setDescription('Update the member role ID')
                .addRoleOption(option => option.setName('role').setDescription('New member role').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('update_twitch_channel').setDescription('Update the Twitch notification channel')
                .addChannelOption(option => option.setName('channel').setDescription('New Twitch notification channel').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('update_twitch_role').setDescription('Update the Twitch notification role')
                .addRoleOption(option => option.setName('role').setDescription('New Twitch notification role').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('update_twitter_channel').setDescription('Update the Twitter notification channel')
                .addChannelOption(option => option.setName('channel').setDescription('New Twitter notification channel').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('update_twitter_role').setDescription('Update the Twitter notification role')
                .addRoleOption(option => option.setName('role').setDescription('New Twitter notification role').setRequired(true))),
    async execute(interaction, db) {
        await interaction.deferReply();

        let response;
        const options = interaction.options;
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'update_reset_date':
                await db.updateSettingByName('reset_date', options.getString('date'));
                response = `Reset date updated: ${options.getString('date')}`;
                break;
            case 'update_member_role':
                await db.updateSettingByName('member_role', options.getRole('role').id);
                response = `Member role ID updated: ${options.getRole('role').id}`;
                break;
            case 'update_twitch_channel':
                await db.updateSettingByName('twitch_notif_channel', options.getChannel('channel').id);
                response = `Twitch notification channel updated: ${options.getChannel('channel').id}`;
                break;
            case 'update_twitch_role':
                await db.updateSettingByName('twitch_notif_role', options.getRole('role').id);
                response = `Twitch notification role ID updated: ${options.getRole('role').id}`;
                break;
            case 'update_twitter_channel':
                await db.updateSettingByName('twitter_notif_channel', options.getChannel('channel').id);
                response = `Twitter notification channel updated: ${options.getChannel('channel').id}`;
                break;
            case 'update_twitter_role':
                await db.updateSettingByName('twitter_notif_role', options.getRole('role').id);
                response = `Twitter notification role ID updated: ${options.getRole('role').id}`;
                break;
            default:
                response = 'Invalid subcommand.';
        }

        // Reply
        await interaction.editReply(response);
    }
}            