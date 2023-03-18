const { SlashCommandBuilder } = require('discord.js');
const {
    printUsers,
    printInfo,
    addUser,
    editUser,
    removeUser,
    findUser,
    updateResetDate,
    updateMemberRole,
    updateTwitchChannel,
    updateTwitchRole,
    updateTwitterChannel,
    updateTwitterRole
} = require('../databaseUtil');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testing')
        .setDescription('Commands for testing database operations')
        .addSubcommand(subcommand =>
            subcommand.setName('print_users').setDescription('Print all users'))
        .addSubcommand(subcommand =>
            subcommand.setName('print_info').setDescription('Print all info'))
        .addSubcommand(subcommand =>
            subcommand.setName('add_user').setDescription('Add a user with email, name, and Discord ID')
                .addStringOption(option => option.setName('email').setDescription('Email').setRequired(true))
                .addStringOption(option => option.setName('name').setDescription('Name').setRequired(true))
                .addUserOption(option => option.setName('discord_id').setDescription('Discord ID').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('edit_user').setDescription('Edit a user using their email')
                .addStringOption(option => option.setName('email').setDescription('Email').setRequired(true))
                .addStringOption(option => option.setName('name').setDescription('New name'))
                .addUserOption(option => option.setName('discord_id').setDescription('New Discord ID')))
        .addSubcommand(subcommand =>
            subcommand.setName('remove_user').setDescription('Remove a user using their email')
                .addStringOption(option => option.setName('email').setDescription('Email').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('find_user').setDescription('Find and print a user with their email')
                .addStringOption(option => option.setName('email').setDescription('Email').setRequired(true)))
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

        // Print all users
        if (interaction.options.getSubcommand() === 'print_users') {
            response = await printUsers(db);
        }

        // Print all info entries
        if (interaction.options.getSubcommand() === 'print_info') {
            response = await printInfo(db);
        }

        // Add user
        if (interaction.options.getSubcommand() === 'add_user') {
            response = await addUser(options.getString('email'), options.getString('name'), options.getUser('discord_id').tag, db);
        }

        // Edit user
        if (interaction.options.getSubcommand() === 'edit_user') {
            const userEmail = options.getString('email');
            const userName = options.getString('name') || null;
            const discordUser = options.getUser('discord_id');
            const discordTag = discordUser ? discordUser.tag : null;

            response = await editUser(userEmail, userName, discordTag, db);
        }

        // Remove user
        if (interaction.options.getSubcommand() === 'remove_user') {
            response = await removeUser(options.getString('email'), db);
        }

        // Find user
        if (interaction.options.getSubcommand() === 'find_user') {
            response = await findUser(options.getString('email'), db);
        }

        // Update reset date
        if (interaction.options.getSubcommand() === 'update_reset_date') {
            response = await updateResetDate(options.getString('date'), db);
        }

        // Update member role ID
        if (interaction.options.getSubcommand() === 'update_member_role') {
            response = await updateMemberRole(options.getRole('role').id, db);
        }

        // Update Twitch notification channel
        if (interaction.options.getSubcommand() === 'update_twitch_channel') {
            response = await updateTwitchChannel(options.getChannel('channel').id, db);
        }

        // Update Twitch notification role
        if (interaction.options.getSubcommand() === 'update_twitch_role') {
            response = await updateTwitchRole(options.getRole('role').id, db);
        }

        // Update Twitter notification channel
        if (interaction.options.getSubcommand() === 'update_twitter_channel') {
            response = await updateTwitterChannel(options.getChannel('channel').id, db);
        }

        // Update Twitter notification role
        if (interaction.options.getSubcommand() === 'update_twitter_role') {
            response = await updateTwitterRole(options.getRole('role').id, db);
        }

        // Reply
        await interaction.editReply(response);
    }
}            