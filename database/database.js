const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const EventEmitter = require('events');
const pg = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

const database = process.env.DB_DATABASE;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const User = require('./models/User');
const Info = require('./models/Info');

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
    this.Info = Info(this.sequelize, Sequelize);

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
    client.query('LISTEN infos_changes');

    client.on('notification', async (msg) => {
      const payload = JSON.parse(msg.payload);
      switch (payload.event) {
        case 'users_changes':
          if (payload.type === 'INSERT') {
            this.emit('userAdded', payload);
          } else if (payload.type === 'UPDATE') {
            this.emit('userUpdated', payload);
          } else if (payload.type === 'DELETE') {
            this.emit('userDeleted', payload);
          }
          break;
        case 'infos_changes':
          if (payload.type === 'UPDATE') {
            this.emit('infoUpdated', payload);
          }
          break;
        default:
          console.log(`Unhandled event: ${msg.channel}`);
      }
    });
  }

  async createUser(data) {
    return await this.User.create(data);
  }

  async updateUserByEmail(email, updates) {
    return await this.User.update(updates, { where: { email }, returning: true });
  }

  async deleteUserByEmail(email) {
    return await this.User.destroy({ where: { email } });
  }

  async findUserByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async createInfoEntry(data) {
    return await this.Info.create(data);
  }

  async updateInfoEntry(key, value) {
    return await this.Info.update({ value }, { where: { info: key }, returning: true });
  }

  async deleteInfoEntry(key) {
    return await this.Info.destroy({ where: { info: key } });
  }

  async getAllInfo() {
    return await this.Info.findAll();
  }

  async getAllUsers() {
    return await this.User.findAll();
  }
}

module.exports = (listenToEvents) => new Database(listenToEvents);