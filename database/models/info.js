const mongoose = require('mongoose');
const { Schema } = mongoose;

const infoSchema = new Schema({
  info: { type: String, required: true },
  value: { type: String, required: true }
});

const modelName = 'Info';

// Check if the model is already compiled, and if so, return it.
if (mongoose.models[modelName]) {
  module.exports = mongoose.model(modelName);
} else {
  // If the model is not compiled, compile and export it.
  module.exports = mongoose.model(modelName, infoSchema);
}
