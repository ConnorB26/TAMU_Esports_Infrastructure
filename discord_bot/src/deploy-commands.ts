import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { client } from './config';

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

export async function deployCommandsToAllGuilds() {
    try {
        console.log("Started refreshing application (/) commands.");

        for (const guild of client.guilds.cache.values()) {
            await rest.put(
                Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guild.id),
                {
                    body: commandsData,
                }
            );
        }

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}

deployCommandsToAllGuilds();