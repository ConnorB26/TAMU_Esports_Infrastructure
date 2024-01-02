const dotenv = require('dotenv');

dotenv.config();

const {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_SCHEMA,
    JWT_SECRET,
    DISCORD_CLIENT_SECRET,
    DISCORD_CLIENT_ID,
    DISCORD_CALLBACK_URL,
    DISCORD_SUCCESS_REDIRECT_URL,
    DISCORD_FAILURE_REDIRECT_URL
} = process.env;

const DB_PORT_NUMBER: number = +DB_PORT;

export const config = {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT_NUMBER,
    DB_SCHEMA,
    JWT_SECRET,
    DISCORD_CLIENT_SECRET,
    DISCORD_CLIENT_ID,
    DISCORD_CALLBACK_URL,
    DISCORD_SUCCESS_REDIRECT_URL,
    DISCORD_FAILURE_REDIRECT_URL
};