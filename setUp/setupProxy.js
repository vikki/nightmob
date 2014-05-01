var recordHAR = require('../lib/recordHAR');

exports.setupProxy = function(nightwatch, callback) {
  var nightwatchClient = nightwatch.client;
      nightwatchClient.proxy = recordHAR.createProxy();

  recordHAR.startProxy(nightwatchClient.proxy, function(err, proxyPort) {
    var proxyUrl = 'localhost' + ':' +  proxyPort;

    nightwatchClient.desiredCapabilities.proxy = { httpProxy: proxyUrl };
    nightwatchClient.proxyPort = proxyPort;

    if (typeof callback === "function") {
        callback();
    }
  });

};
