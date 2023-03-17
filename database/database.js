const path = require('path');
const mongoose = require('mongoose');
const EventEmitter = require('events');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

const UserSchema = require('./models/User');
const InfoSchema = require('./models/Info');

class Database extends EventEmitter {
  constructor(watch = false) {
    super();
    this.connect();
    this.watch = watch;
  }

  async connect() {
    try {
      const ssl = path.resolve(__dirname, '../DB_Cert.pem');

      await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        sslKey: ssl,
        sslCert: ssl,
      });

      console.log('MongoDB connected');
      await this.enablePreAndPostImages();
      if (this.watch) {
        this.watchChanges();
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

  async enablePreAndPostImages() {
    try {
      const result = await mongoose.connection.db.command({
        collMod: 'users',
        changeStreamPreAndPostImages: { enabled: true },
      });

      console.log('Pre and Post Images Enabled:', result);
    } catch (error) {
      console.error('Error enabling Pre and Post Images:', error);
    }
  }

  watchChanges() {
    const userChangeStream = mongoose.connection.collection('users').watch([
      {
        $match: {
          operationType: { $in: ['insert', 'update', 'delete'] },
        },
      },
    ],
      {
        fullDocument: 'updateLookup',
        fullDocumentBeforeChange: 'whenAvailable'
      });

    const infoChangeStream = mongoose.connection.collection('infos').watch();

    userChangeStream.on('change', async (change) => {
      switch (change.operationType) {
        case 'insert':
          this.emit('userAdded', change.fullDocument);
          break;
        case 'update':
          const oldUser = change.fullDocumentBeforeChange;
          const updatedFields = change.updateDescription.updatedFields;
          const newUser = { ...oldUser, ...updatedFields };
          this.emit('userUpdated', oldUser, newUser);
          break;
        case 'delete':
          this.emit('userDeleted', change.fullDocumentBeforeChange);
          break;
      }
    });


    infoChangeStream.on('change', async (change) => {
      if (change.operationType === 'update') {
        const infoEntry = await InfoSchema.findById(change.documentKey._id);
        const key = infoEntry.info;
        const value = change.updateDescription.updatedFields.value;
        this.emit('infoUpdated', { key, value });
      }
    });

  }

  async createUser(data) {
    const newUser = new UserSchema(data);
    return await newUser.save();
  }

  async updateUserByEmail(email, updates) {
    return await UserSchema.findOneAndUpdate({ email: email }, updates, { new: true });
  }

  async deleteUserByEmail(email) {
    return await UserSchema.findOneAndDelete({ email: email });
  }

  async findUserByEmail(email) {
    return await UserSchema.findOne({ email: email });
  }

  async createInfoEntry(data) {
    const newEntry = new InfoSchema(data);
    return await newEntry.save();
  }

  async updateInfoEntry(key, value) {
    return await InfoSchema.findOneAndUpdate({ info: key }, { $set: { value } }, { new: true });
  }

  async deleteInfoEntry(key) {
    return await InfoSchema.findOneAndDelete({ info: key });
  }

  async getAllInfo() {
    return await InfoSchema.find({});
  }

  async getAllUsers() {
    return await UserSchema.find({});
  }
}

module.exports = (watch = false) => new Database(watch);