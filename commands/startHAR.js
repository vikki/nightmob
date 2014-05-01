var recordHAR = require('../lib/recordHAR');

exports.command = function(harName, callback) {
  var self = this;

  if (!this.proxy) {
    console.error('No proxy setup - did you call setupProxy() ?');
  }

  recordHAR.startHAR(this.proxy, this.proxyPort, harName, function (err) {
	if (typeof callback === "function") {
      callback.call(self, result);
    }
  });

  return this; // allows the command to be chained.
};
