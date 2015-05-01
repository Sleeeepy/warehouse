'use strict';

var mongoose = require('mongoose'),
    treePlugin = require('mongoose-tree2'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  slug: String,
  info: String,
  description: String,
  images:[{ type: Schema.Types.ObjectId, ref: 'Image'}],
  parent:{ type: Schema.Types.ObjectId, ref: 'Category' ,default: null},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  active: Boolean

});

CategorySchema.plugin(treePlugin);

module.exports = mongoose.model('Category', CategorySchema);
