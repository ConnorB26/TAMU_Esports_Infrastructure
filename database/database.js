const path = require('path');
const mongoose = require('mongoose');
const EventEmitter = require('events');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

const UserSchema = require('./models/User');

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
      if (this.watch) {
        this.watchChanges();
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

  watchChanges() {
    const collection = mongoose.connection.collection('users');
    const changeStream = collection.watch();

    changeStream.on('change', (change) => {
      switch (change.operationType) {
        case 'insert':
          this.emit('documentAdded', change.fullDocument);
          break;
        case 'update':
          this.emit('documentUpdated', change.updateDescription);
          break;
        case 'delete':
          this.emit('documentDeleted', change.documentKey);
          break;
      }
    });
  }

  async addDocument(data) {
    const newDocument = new UserSchema(data);
    return await newDocument.save();
  }

  async updateDocument(id, updates) {
    return await UserSchema.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteDocument(id) {
    return await UserSchema.findByIdAndDelete(id);
  }
}

module.exports = (watch = false) => new Database(watch);