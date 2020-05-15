const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const StrategysSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imgurl: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = strategysmodel = mongoose.model("strategys", StrategysSchema, "strategys");