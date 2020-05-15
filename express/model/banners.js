const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const BannersSchema = new Schema({
  bannerimg: {
    type: String,
    required: true
  }
})

module.exports = bannersmodel = mongoose.model("banners", BannersSchema, "banners");