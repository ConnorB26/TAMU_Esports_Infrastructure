const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		// Check if permission to execute commands in AME Server
		const { roles } = interaction.member;
		if (interaction.guild.id === "490773969876549643" && !(
			roles.cache.has("518141455760490496") // Junior Officer
			|| roles.cache.has("490786631972945920") // Admin
			|| roles.cache.has("490786631117176832") // Officer
			|| roles.cache.has("1079094201096097902") // Dev Team
		)) {
			interaction.reply({ content: "You do not have permission to execute this command.", ephemeral: true })
		}

		// Handle command
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};