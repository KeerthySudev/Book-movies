const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // User's email, must be unique
  // phone: { type: String, required: true }, 
  role: { type: String, default: 'user' },
});


const User = mongoose.model('User', userSchema);
module.exports = User;
