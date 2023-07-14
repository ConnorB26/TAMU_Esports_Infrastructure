import { Client, IntentsBitField } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID, BACKEND_DISCORD_TOKEN, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
    throw new Error("Missing environment variables");
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
    BACKEND_DISCORD_TOKEN,
    TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET
};

export const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.GuildMembers],
});