var recordHAR = require('../lib/recordHAR');

exports.command = function(callback) {
  var self = this;
  if (!this.proxy) {
    console.error('No proxy setup - did you call setupProxy() ?');
  }

  recordHAR.stopListening(this.proxy, this.proxyPort, function (err) {
     if (typeof callback === "function") {
      callback.call(self, result);
    }
  });

  return this;
};
