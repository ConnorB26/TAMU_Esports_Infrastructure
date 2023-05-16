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
                case 'dues_payment_updated_true':
                    this.emit('addMember', payload);
                    break;
                case 'dues_payment_updated_false':
                    this.emit('removeMember', payload);
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

    // CRUD functions for discord_settings
    async findSettingByName(name) {
        return await this.Setting.findOne({ where: { name } });
    }

    async createSetting(name, value) {
        return await this.Setting.create({ name, value });
    }

    async updateSettingByName(name, newValue) {
        return await this.Setting.update({ value: newValue }, { where: { name } });
    }

    async deleteSettingByName(name) {
        return await this.Setting.destroy({ where: { name } });
    }

    async getAllSettings() {
        return await this.Setting.findAll();
    }

    async deleteAllSettings() {
        return await this.Setting.destroy({ where: {} });
    }

    // CRUD functions for paid_dues
    async createPaidDue(paidDueData) {
        return await this.PaidDue.create(paidDueData);
    }

    async getPaidDueByConfirmationNumber(confirmation_number) {
        return await this.PaidDue.findOne({ where: { confirmation_number } });
    }

    async getPaidDueByFullName(full_name) {
        return await this.PaidDue.findOne({ where: { full_name } });
    }

    async updatePaidDueByConfirmationNumber(confirmation_number, newPaidDueData) {
        return await this.PaidDue.update(newPaidDueData, { where: { confirmation_number } });
    }

    async updatePaidDueByFullName(full_name, newPaidDueData) {
        return await this.PaidDue.update(newPaidDueData, { where: { full_name } });
    }

    async deletePaidDueByConfirmationNumber(confirmation_number) {
        return await this.PaidDue.destroy({ where: { confirmation_number } });
    }

    async deletePaidDueByFullName(full_name) {
        return await this.PaidDue.destroy({ where: { full_name } });
    }

    async getAllPaidDues() {
        return await this.PaidDue.findAll();
    }

    async deleteAllPaidDues() {
        return await this.PaidDue.destroy({ where: {} });
    }

    // CRUD functions for users
    async createUser(userData) {
        return await this.User.create(userData);
    }

    async findUserByColumn(column, value) {
        return await this.User.findOne({ where: { [column]: value } });
    }

    async updateUserByColumn(column, value, newUserData) {
        return await this.User.update(newUserData, { where: { [column]: value } });
    }

    async deleteUserByColumn(column, value) {
        return await this.User.destroy({ where: { [column]: value } });
    }

    async getAllUsers() {
        return await this.User.findAll();
    }

    // Utility functions
    async claimDues(user_id, confirmation_number) {
        const user = await this.User.findByPk(user_id);
        const paidDue = await this.getPaidDueByConfirmationNumber(confirmation_number);

        if (user && paidDue) {
            await user.update({ has_paid_dues: true, confirmation_code: confirmation_number });
            await paidDue.update({ claimed: true });
        }
    }

    async unclaimDues(user_id) {
        const user = await this.User.findByPk(user_id);
        if (user && user.confirmation_code) {
            const paidDue = await this.getPaidDueByConfirmationNumber(user.confirmation_code);
            if (paidDue) {
                await paidDue.update({ claimed: false });
            }
            await user.update({ has_paid_dues: false, confirmation_code: null });
        }
    }

    async resetAllDues() {
        await this.deleteAllPaidDues();
        await this.User.update({ has_paid_dues: false, confirmation_code: null }, { where: {} });
    }
}

module.exports = (listenToEvents) => new Database(listenToEvents);