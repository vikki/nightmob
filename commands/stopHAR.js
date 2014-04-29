var recordHAR = require('./lib/recordHAR');

exports.command = function(file, callback) {
  var self = this;
  if (!this.proxy) {
    console.log('no proxy to kill capn');
  }

  recordHAR.stopListening(this.proxy, this.proxyPort, function () {
       if (typeof callback === "function") {
        callback.call(self, result);
      }
  });

  return this; // allows the command to be chained.
};
