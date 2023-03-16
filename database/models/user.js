const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@tamu\.edu$/,
  },
  name: { type: String, required: true },
  discordId: { type: String, required: true },
  membershipPaid: { type: Boolean, default: false },
});

const modelName = 'User';

// Check if the model is already compiled, and if so, return it.
if (mongoose.models[modelName]) {
  module.exports = mongoose.model(modelName);
} else {
  // If the model is not compiled, compile and export it.
  module.exports = mongoose.model(modelName, userSchema);
}
