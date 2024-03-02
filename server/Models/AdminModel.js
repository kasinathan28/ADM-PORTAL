const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminUsername: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPhoneNumber: {
    type: String,
    required: true,
  },
  adminSecretKey: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;