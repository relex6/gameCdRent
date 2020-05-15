const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const GamelistsSchema = new Schema({
  language: {
    type: [String]
  },
  salePrice: {
    type: Number,
    required: true
  },
  rentPrice: {
    type: Number,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  engtitle: {
    type: String
  },
  coverimg: {
    type: String,
    required: true
  },
  gameimg: {
    type: [Object],
    required: true
  },
  recommendimg: {
    type: String
  },
  recommendcontent: {
    type: String
  },
  score: {
    type: Number,
    required: true
  },
  lowestprice: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String
  },
  detailcontent: {
    type: String
  },
  size: {
    type: String
  },
  gamer: {
    type: String
  },
  try: {
    type: String
  },
  entity: {
    type: String
  },
  isrecommend: {
    type: Boolean,
    default: false
  }
})

module.exports = dealsmodel = mongoose.model("gamelists", GamelistsSchema, "gamelists");