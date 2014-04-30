var recordHAR = require('./lib/recordHAR');

exports.command = function(file, callback) {
  var self = this;
  if (!this.proxy) {
    console.log('no proxy to get the har with capn');
  }

  recordHAR.getHAR(this.proxy, this.proxyPort, function (harData) {
       if (typeof callback === "function") {
        callback.call(self, harData);
      }

      console.log(harData);
  });

  return this; // allows the command to be chained.
};
