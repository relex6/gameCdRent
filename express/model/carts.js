const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const CartsSchema = new Schema({
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
  type: {
    type: String,
    required: true
  }
})

module.exports = cartsmodel = mongoose.model("carts", CartsSchema, "carts");