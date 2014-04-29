var recordHAR = require('./lib/recordHAR');

exports.command = function(harName, callback) {
  var self = this;

  recordHAR.startListening(this.proxy, this.proxyPort, harName, function (proxyPort) {
	if (typeof callback === "function") {
        callback.call(self, result);
      }
  });

  return this; // allows the command to be chained.
};
