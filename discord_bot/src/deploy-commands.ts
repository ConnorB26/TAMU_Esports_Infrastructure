import { REST, Routes } from "discord.js";
import { config } from "./utilities/config";
import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

export async function deployCommandsToAllGuilds() {
    try {
		console.log(`Started refreshing ${commandsData.length} application (/) commands.`);

		const data: any = await rest.put(
            Routes.applicationCommands(config.DISCORD_CLIENT_ID),
			{ body: commandsData }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}

deployCommandsToAllGuilds();