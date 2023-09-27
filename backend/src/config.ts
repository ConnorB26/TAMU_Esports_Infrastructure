const dotenv = require('dotenv');

dotenv.config();

const {
    BACKEND_DISCORD_TOKEN,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_SCHEMA
} = process.env;

const DB_PORT_NUMBER: number = +DB_PORT;

export const config = {
    BACKEND_DISCORD_TOKEN,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT_NUMBER,
    DB_SCHEMA
};