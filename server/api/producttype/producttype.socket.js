/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Producttype = require('./producttype.model');

exports.register = function(socket) {
  Producttype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Producttype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('producttype:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('producttype:remove', doc);
}