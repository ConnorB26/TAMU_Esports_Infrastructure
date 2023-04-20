const { SlashCommandBuilder } = require('discord.js');
const {
    updateResetDate,
    updateMemberRole,
    updateTwitchChannel,
    updateTwitchRole,
    updateTwitterChannel,
    updateTwitterRole
} = require('../databaseUtil');

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
                response = await updateResetDate(options.getString('date'), db);
                break;
            case 'update_member_role':
                response = await updateMemberRole(options.getRole('role').id, db);
                break;
            case 'update_twitch_channel':
                response = await updateTwitchChannel(options.getChannel('channel').id, db);
                break;
            case 'update_twitch_role':
                response = await updateTwitchRole(options.getRole('role').id, db);
                break;
            case 'update_twitter_channel':
                response = await updateTwitterChannel(options.getChannel('channel').id, db);
                break;
            case 'update_twitter_role':
                response = await updateTwitterRole(options.getRole('role').id, db);
                break;
            default:
                response = 'Invalid subcommand.';
        }

        // Reply
        await interaction.editReply(response);
    }
}            