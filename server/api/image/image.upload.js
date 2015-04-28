'use strict';

var Upload = require ('s3-uploader');


var client = new Upload('ezpublicimages', {
  aws:{region: 'eu-central-1',
      path: 'images/',
      acl: 'public-read',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET
      },
  versions: [{
    original: true
  },{
    suffix: '-large',
    quality: 100,
    maxHeight: 1040,
    maxWidth: 1040,
  },{
    suffix: '-medium',
    maxHeight: 780,
    maxWidth: 780
  },{
    suffix: '-small',
    maxHeight: 320,
    maxWidth: 320
  }]
});


exports.upload = client.upload; //client.upload = function(img.path,callback(err, images, meta))
