var Proxy = require('browsermob-proxy').Proxy;

exports.setupProxy = function(nightwatch, callback) {
  var nightwatchClient = nightwatch.client;
      nightwatchClient.proxy = new Proxy({ host: 'localhost', port: 8080 });;

  nightwatchClient.proxy.start(function(err, data) {
    var proxyPort = data.port,
        proxyUrl = 'localhost' + ':' +  proxyPort;

    nightwatchClient.desiredCapabilities.proxy = { httpProxy: proxyUrl };
    nightwatchClient.proxyPort = proxyPort;

    if (typeof callback === "function") {
      callback();
    }
  });
};