var _ = require('underscore');

var ServiceRequest = require('../../request/service-request');
var Response = ServiceRequest.Response;

/**
 * @constructor
 * @param {!Configuration} configuration
 */
function DebugService(configuration) {
  this.configuration_ = configuration;

  _.bindAll(this);

  var public_ = {
    ping: this.ping,
    authPing: this.authPing
  }

  return public_;
}

/**
 * Fetches a collection of account based attributes.
 * 
 * @param  {Function} callback Method to invoke with response.
 */
DebugService.prototype.ping = function(callback){
  var method = new ServiceRequest.RequestMethod(this.configuration_, {
    method: DebugService.serviceMethods.ping
  });

  var request = new ServiceRequest(this.configuration_, method);

  request.submit(function(r){
    callback(new Response({
      data: r.getData(),
      status: r.getStatus(),
      error: r.getError()
    }));
  });
}

/**
 * Service methods supported by this object.
 * 
 * @type {Object}
 */
DebugService.serviceMethods = {
  ping : 'rustici.debug.ping',
  authPing : 'rustici.debug.authPing'
}

module.exports = DebugService;