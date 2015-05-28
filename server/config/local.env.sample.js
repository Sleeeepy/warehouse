'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'warehouse-secret',
  AWS_ACCESS_KEY:'AKIAJMBSCA3ZTQ2ZSIDQ',
  AWS_SECRET:'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'

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
