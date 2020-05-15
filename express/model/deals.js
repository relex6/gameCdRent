const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const DealsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  gameid: {
    type: Schema.Types.ObjectId,
    ref: "gamelists"
  },
  cartid: {
    type: Schema.Types.ObjectId,
    ref: "carts"
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  returndate: {
    type: Date
  }
})

module.exports = dealsmodel = mongoose.model("delas", DealsSchema, "deals");