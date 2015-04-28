'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  info: String,
  caption: String,
  active: Boolean
});

module.exports = mongoose.model('Image', ImageSchema);
