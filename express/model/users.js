const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const UsersSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  nick: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  lastlogin: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "非冻结"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// module.exports = gamelistmodel = mongoose.model("users", UsersSchema, "users");
module.exports = usersmodel = mongoose.model("users", UsersSchema, "users");