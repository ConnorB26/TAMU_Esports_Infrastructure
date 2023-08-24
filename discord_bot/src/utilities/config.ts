import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID, BACKEND_DISCORD_TOKEN, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
    throw new Error("Missing environment variables");
}

const BASE_URL = 'http://backend:3001';

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
    BACKEND_DISCORD_TOKEN,
    TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET,
    BASE_URL
};

export const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildModeration, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages],
});

export const rateLimit = {
    minutes: 1,
    commands: 5
};

export const purgeRoldIDs = ['490790816889962506', '881711748560846848', '490790817754251264', '490786632383987734'];