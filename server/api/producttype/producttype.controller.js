'use strict';

var _ = require('lodash');
var Producttype = require('./producttype.model');

// Get list of producttypes
exports.index = function(req, res) {
  Producttype.find(function (err, producttypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, producttypes);
  });
};

// Get a single producttype
exports.show = function(req, res) {
  Producttype.findById(req.params.id, function (err, producttype) {
    if(err) { return handleError(res, err); }
    if(!producttype) { return res.send(404); }
    return res.json(producttype);
  });
};

// Creates a new producttype in the DB.
exports.create = function(req, res) {
  Producttype.create(req.body, function(err, producttype) {
    if(err) { return handleError(res, err); }
    return res.json(201, producttype);
  });
};

// Updates an existing producttype in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Producttype.findById(req.params.id, function (err, producttype) {
    if (err) { return handleError(res, err); }
    if(!producttype) { return res.send(404); }
    var updated = _.merge(producttype, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, producttype);
    });
  });
};

// Deletes a producttype from the DB.
exports.destroy = function(req, res) {
  Producttype.findById(req.params.id, function (err, producttype) {
    if(err) { return handleError(res, err); }
    if(!producttype) { return res.send(404); }
    producttype.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}