'use strict';

var _        = require('lodash');
var Category = require('./category.model'),
    Helper   = require('../../components/libs/helper');

// Get list of categorys
exports.index = function(req, res) {


  Category.find(function (err, categories) {
    if(err) {  handleError(res, err); }

    if(req.query.tree && categories.length>0){
      var roots = categories.filter(function(category){
        return !category.parent;
      });
      console.log(roots);
      var tree = function(cat,cb){
        cat.getChildrenTree({},function(err,tree){
          cb(err,tree);
        });
      };
      Helper.fullParallelBatch(tree,roots,function(trees){
        //if(err) {handleError(res, err); }
        return res.json(200, trees);
      });



    }else{
      return res.json(200, categories);
    }

  });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.json(201, category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
