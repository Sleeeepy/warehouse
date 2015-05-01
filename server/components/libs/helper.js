'use strict';

function series(callbacks, last) {
  console.log('series',callbacks);
  var results = [];
  function next() {
    var callback = callbacks.shift();
    if(callback) {
      callback(function() {
        results.push(Array.prototype.slice.call(arguments));
        console.log(results);
        next();
      });
    } else {
      last(results);
    }
  }
  next();
}

/* Example task
function async(arg, callback) {
  var delay = Math.floor(Math.random() * 5 + 1) * 100; // random ms
  console.log('async with \''+arg+'\', return in '+delay+' ms');
  setTimeout(function() { callback(arg * 2); }, delay);
}
function final(results) { console.log('Done', results); }

series([
  function(next) { async(1, next); },
  function(next) { async(2, next); },
  function(next) { async(3, next); },
  function(next) { async(4, next); },
  function(next) { async(5, next); },
  function(next) { async(6, next); }
], final);
*/



function fullParallel(callbacks, last) {
  var results = [];
  var result_count = 0;
  callbacks.forEach(function(callback, index) {
    callback( function() {
      results[index] = Array.prototype.slice.call(arguments);
      result_count++;
      if(result_count === callbacks.length) {
        last(results);
      }
    });
  });
}
/* Example task
function async(arg, callback) {
  var delay = Math.floor(Math.random() * 5 + 1) * 100; // random ms
  console.log('async with \''+arg+'\', return in '+delay+' ms');
  setTimeout(function() { callback(arg * 2); }, delay);
}
function final(results) { console.log('Done', results); }

fullParallel([
  function(next) { async(1, next); },
  function(next) { async(2, next); },
  function(next) { async(3, next); },
  function(next) { async(4, next); },
  function(next) { async(5, next); },
  function(next) { async(6, next); }
], final);
*/


function limitedParallel(limit, callbacks, last) {
  var results = [];
  var running = 1;
  var task = 0;
  function next(){
    running--;
    if(task === callbacks.length && running === 0) {
      last(results);
    }
    while(running < limit && callbacks[task]) {
      var callback = callbacks[task];
      (function(index) {
        callback(function() {
          results[index] = Array.prototype.slice.call(arguments);
          next();

        });
      })(task);
      task++;
      running++;
    }
  }
  next();
}
/* Example task
function async(arg, callback) {
  var delay = Math.floor(Math.random() * 5 + 1) * 1000; // random ms
  console.log('async with \''+arg+'\', return in '+delay+' ms');
  setTimeout(function() {
    var result = arg * 2;
    console.log('Return with \''+arg+'\', result '+result);
    callback(result);
  }, delay);
}
function final(results) { console.log('Done', results); }

limitedParallel(3, [
  function(next) { async(1, next); },
  function(next) { async(2, next); },
  function(next) { async(3, next); },
  function(next) { async(4, next); },
  function(next) { async(5, next); },
  function(next) { async(6, next); }
], final);

*/

function createBatch(async,argArray){
    var batch = [];
    /*for (var i=0;i<argArray.length;i++){
      console.log(i,argArray[i]);
      batch.push(function(next){async(argArray[0],next);});
    }*/
    argArray.forEach(function(curFunc,index){
      batch.push(function(next){async(curFunc,next);});
    })
    return batch;

}

function serialBatch(async,argArray,last){
  var batch = createBatch(async,argArray);
  //for (var i=0;i<batch.length;i++){
  //  console.log(i,batch.prototype.name,batch.prototype.arguments);
  //}
  console.log(batch);
  series(batch, last);
}

function fullParallelBatch(async,argArray,last){
  var batch = createBatch(async,argArray);
  //for (var i=0;i<batch.length;i++){
  //  console.log(i,batch.prototype.name,batch.prototype.arguments);
  //}
  console.log(batch);
  fullParallel(batch, last);
}

module.exports = {series          : series,
                  fullParallel    : fullParallel,
                  limitedParallel : limitedParallel,
                  serialBatch     : serialBatch,
                  fullParallelBatch    : fullParallelBatch
                  };
