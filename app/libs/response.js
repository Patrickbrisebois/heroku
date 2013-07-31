/**********************************
 *      HTTP Responses
 *      200     OK
 *      400     Bad Request
 *      404     Not Found
 *      405     Method Not Allowed
 *      406     Not Acceptable
 *      500     Server Error
 *********************************/

var http = require('http'),
  _ = require('underscore');

http.ServerResponse.prototype.respond = function (content, status, message) {
  //Define content/status/message according to the parameters sends
  if (_.isUndefined(status)) {
    if (_.isNumber(content) || !_.isNaN(parseInt(content))) {
      status = parseInt(content);
      content = null;
    } else {
      status = 200;
      if (_.isObject(content)) {
        content = content;
      } else {
        content = null;
      }
    }
  }
  //Catch MongoDB errors and set status/message according to the content of the MongoDB error received
  if (content && content.name){
    if(content.name == 'MongoError'){
      if (content.code == 11000) {  //duplicate key
        status = 400;
      } else {
        status = 500;
      }
      message = new Error(content.err);
    }
    else if(content.name == 'ValidationError'){
      status = 409;
      //TODO : Format message to return an object of error messages (can have more than 1 error)
      message = content;
    }
    else if(content.name == 'CastError'){
      status = 400;
      //TODO : Format message to return an object of error messages
      message = content;
    }
  }
  //Write response to send
  var response = {
    'status':{
      'code':status,
      'definition':http.STATUS_CODES[status],
      'message':message || null
    },
    'content':content || null
  };
  //Set header and send response
  this.charset = 'utf-8';
  this.contentType('application/json');
  this.send(JSON.stringify(response) + '\n', status);
};