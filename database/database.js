const path = require('path');
const { Sequelize } = require('sequelize');
const EventEmitter = require('events');
const pg = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../../', '.env') });

const database = process.env.DB_DATABASE;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const User = require('./models/user.js');
const Setting = require('./models/settings.js');
const PaidDue = require('./models/paid_dues.js');

class Database extends EventEmitter {
    constructor(listenToEvents = false) {
        super();
        this.sequelize = new Sequelize(database, user, password, {
            host,
            port,
            dialect: 'postgres',
            logging: false,
        });

        this.User = User(this.sequelize, Sequelize);
        this.Setting = Setting(this.sequelize, Sequelize);
        this.PaidDue = PaidDue(this.sequelize, Sequelize);

        if (listenToEvents) {
            this.setupListeners();
        }
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
            await this.sequelize.sync();
        } catch (error) {
            console.error('Error connecting to PostgreSQL:', error);
        }
    }

    async setupListeners() {
        const client = new pg.Client({
            connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
        });
        await client.connect();
        client.query('LISTEN users_changes');
        client.query('LISTEN settings_changed');
        client.query('LISTEN dues_payment_updated');

        client.on('notification', async (msg) => {
            const payload = JSON.parse(msg.payload);
            switch (payload.event) {
                case 'dues_payment_updated':
                    this.emit('addMember', payload);
                    break;
                case 'users_changes':
                    if (payload.type === 'INSERT') {
                        this.emit('userAdded', payload);
                    } else if (payload.type === 'UPDATE') {
                        this.emit('userUpdated', payload);
                    } else if (payload.type === 'DELETE') {
                        this.emit('userDeleted', payload);
                    }
                    break;
                case 'settings_changed':
                    this.emit('settingUpdated', payload);
                    break;
                default:
                    console.log(`Unhandled event: ${msg.channel}`);
            }
        });
    }

    // Reset information at the end of the semester
    async resetDues() {
        try {
            // Clear paid dues table
            await this.PaidDue.destroy({ where: {} });

            // Reset has_paid_dues column in users table
            await this.User.update({ has_paid_dues: false }, { where: {} });

            // Reset confirmation_code column in users table
            await this.User.update({ confirmation_code: null }, { where: {} });

            console.log('Dues information reset successfully.');
        } catch (error) {
            console.error(`Error resetting dues information: ${error.message}`);
        }
    }

    // Get entire discord_settings table
    async getAllDiscordSettings() {
        try {
            const settings = await this.Setting.findAll();
            return settings;
        } catch (error) {
            console.error(`Error fetching all Discord settings: ${error.message}`);
            return null;
        }
    }

    // Set settings
    async updateSettingByName(name, value) {
        try {
            const updatedSetting = await this.Setting.update({ value }, { where: { name } });
            if (updatedSetting[0] === 0) {
                console.log(`No setting found with name: ${name}`);
                return null;
            }
            console.log(`Setting '${name}' updated to value: ${value}`);
            return updatedSetting;
        } catch (error) {
            console.error(`Error updating setting '${name}': ${error.message}`);
            return null;
        }
    }


    // User CRUD operations
    async createUser(data) {
        return await this.User.create(data);
    }

    async getUser(id) {
        return await this.User.findByPk(id);
    }

    async updateUser(id, data) {
        return await this.User.update(data, { where: { id } });
    }

    async deleteUser(id) {
        return await this.User.destroy({ where: { id } });
    }

    // Setting CRUD operations
    async createSetting(data) {
        return await this.Setting.create(data);
    }

    async getSetting(id) {
        return await this.Setting.findByPk(id);
    }

    async updateSetting(id, data) {
        return await this.Setting.update(data, { where: { id } });
    }

    async deleteSetting(id) {
        return await this.Setting.destroy({ where: { id } });
    }

    // PaidDue CRUD operations
    async createPaidDue(data) {
        return await this.PaidDue.create(data);
    }

    async getPaidDue(id) {
        return await this.PaidDue.findByPk(id);
    }

    async updatePaidDue(id, data) {
        return await this.PaidDue.update(data, { where: { id } });
    }

    async deletePaidDue(id) {
        return await this.PaidDue.destroy({ where: { id } });
    }
}

module.exports = (listenToEvents) => new Database(listenToEvents);