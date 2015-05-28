'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Upload = require('s3-uploader');

//SET s3-uploader to use GraphicsMagic!!


var ImageSchema = new Schema({
  name: String,
  info: String,
  path: String,
  versions:{
      org:{
          width: Number,
          height: Number,
          url: String
        },
      lg:{
          width: Number,
          height: Number,
          url: String
          },
      md:{
          width: Number,
          height: Number,
          url: String
          },
      sm:{
          path: String,
          width: Number,
          height: Number,
          url: String
          }
  }
});


var client = new Upload('ezpublicimages', {
  aws:{region: 'eu-central-1',
      path: 'images/',
      acl: 'public-read',
      accessKeyId: 'AKIAJMBSCA3ZTQ2ZSIDQ',// process.env.AWS_ACCESS_KEY,
      secretAccessKey: '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'// process.env.AWS_SECRET
      },
  versions: [{
      original: true
    },{
      suffix: '-lg',
      //
      quality: 80,
      maxHeight: 780,
      maxWidth: 780,
    },{
      suffix: '-md',
      maxHeight: 320,
      maxWidth: 320
    },{
      suffix: '-sm',
      maxHeight: 120,
      maxWidth: 120
    }]
});


ImageSchema.pre('validate',function(next){
  var self = this;
  client.upload(self.path, {}, function(err, images, meta) {
    if (err) {return err;}
    self.path = images[0].path;
    self.versions = {org : images[0],
                      lg : images[1],
                      md : images[2],
                      sm : images[3]};
    next();
  });


});





module.exports = mongoose.model('Image', ImageSchema);
