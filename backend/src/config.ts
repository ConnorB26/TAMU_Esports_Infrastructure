const dotenv = require('dotenv');
const path = require('path');

// dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

const {
    WEB_SOCKET_TOKEN,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env;

const DB_PORT_NUMBER: number = +DB_PORT;

export const config = {
    WEB_SOCKET_TOKEN,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT_NUMBER
};