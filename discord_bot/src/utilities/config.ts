import { Client } from "discord.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID, WEB_SOCKET_TOKEN } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
    throw new Error("Missing environment variables");
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
    WEB_SOCKET_TOKEN
};

export const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});