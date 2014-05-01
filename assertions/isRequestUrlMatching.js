var recordHAR = require('../lib/recordHAR');

function findMatchingEntries(har, stringToMatch) {
  var harEntries = har.log.entries;
  return harEntries.filter(function(entry) {
    return entry.request.url.indexOf(stringToMatch) !== -1;
  });
}

exports.assertion = function(requestUrlMatcher) {
  this.message = "Testing if there are any requests to URLs matching " + requestUrlMatcher;

  this.expected = requestUrlMatcher;

  this.pass = function(value) {
    var matchingEntries = findMatchingEntries(value, this.expected);
    return matchingEntries.length > 0;
  };

  this.value = function(result) {
    return JSON.parse(result);
  };

  this.command = function(callback) {
    var self = this;
    recordHAR.getHAR(this.api.proxy, this.api.proxyPort, function(err, har) {
      callback(har);
      self.emit('complete');
    });

    return this;
  };
};