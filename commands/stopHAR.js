exports.command = function(callback) {
  var self = this;
  if (!this.proxy) {
    console.error('No proxy setup - did you call setupProxy() ?');
  }

  this.proxy.stop(this.proxyPort, function (err) {
     if (typeof callback === "function") {
      callback.call(self, result);
    }
  });

  return this;
};
