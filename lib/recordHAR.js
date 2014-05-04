var Proxy = require('browsermob-proxy').Proxy;

function createProxy() {
  return new Proxy({ host: 'localhost', port: 8080 });
}

function startProxy(proxy, cb) {
  proxy.start(function(err, data) {
    if (err) {
      console.error('ERROR starting proxy : ' + err);
      cb(err);
      return;
    }
    cb(undefined, data.port);
  });
}

function startHAR(proxy, proxyPort, harName,  cb) {
  proxy.startHAR(proxyPort, harName, function(err) {
    if (err) {
   	  console.error('ERROR setting up har: ' + err);
   	  stopListening(proxy, proxyPort);
   	  cb(err);
      return;
    }
    cb();
  });
}

function stopListening(proxy, proxyPort, callback) {
  proxy.stop(proxyPort, callback);
}

function getHAR(proxy, proxyPort, cb) {
  proxy.getHAR(proxyPort, function(err, resp) {
  	if (err) {
	  console.error('ERROR getting har: ' + err);
	  stopListening(proxy, proxyPort);
      cb(err);
	  return;
	}
  	cb(undefined,resp);
  });
}

module.exports = {
  createProxy: createProxy,
  getHAR: getHAR,
  startProxy: startProxy,
  startHAR: startHAR,
  stopListening: stopListening
};

