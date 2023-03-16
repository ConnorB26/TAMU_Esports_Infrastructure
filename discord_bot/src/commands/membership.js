const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('member')
		.setDescription('Set information related to AME membership')
        .addSubcommand(subcommand => 
            subcommand.setName('set_role').setDescription('Set which role is given to members')
            .addRoleOption((option) =>
            option.setName('role').setDescription('Role').setRequired(true)
        ))
        .addSubcommand(subcommand => 
            subcommand.setName('set_reset').setDescription('Set the date at which all membership roles will be removed')
            // Add date option
        )
        .addSubcommand(subcommand => 
            subcommand.setName('add').setDescription('Give specified user membership status')
            .addUserOption((option) =>
            option.setName('user').setDescription('User').setRequired(true)
        ))
        .addSubcommand(subcommand => 
            subcommand.setName('remove').setDescription('Remove specified user\'s membership status')
            .addUserOption((option) =>
            option.setName('user').setDescription('User').setRequired(true)
        )),
	async execute(interaction) {
        // Store the specified role id to the database
        if(interaction.options.getSubcommand() === 'set_role') {
            await interaction.reply({ content: `Set the membership role to ${interaction.options.getRole('role').name}`, ephemeral: true });
        }

        // Store the specified reset date to the database
        if(interaction.options.getSubcommand() === 'set_reset') {
            await interaction.reply({ content: `Set the reset date`, ephemeral: true });
        }

        // Add the specified user to the membership database table
        if(interaction.options.getSubcommand() === 'add') {
            await interaction.reply({ content: `Gave membership status to ${interaction.options.getUser('user').tag}`, ephemeral: true });
        }

        // Remove the specified user to the membership database table
        if(interaction.options.getSubcommand() === 'remove') {
            await interaction.reply({ content: `Revoked membership status to ${interaction.options.getUser('user').tag}`, ephemeral: true });
        }
	},
};