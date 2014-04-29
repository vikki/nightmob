var Proxy = require('browsermob-proxy').Proxy;

function createProxy() {
	return new Proxy({ host: 'localhost', port: 8080 });
}

function startProxy(proxy, cb) {
	proxy.start(function(err, data) {
	    if (err) {
	    	console.error('ERROR starting proxy : ' + err);
	        //cb(err);
	        return;
	    }

		cb(data.port);
	});
}

function startListening(proxy, proxyPort, harName,  cb) {
	proxy.startHAR(proxyPort, harName, function(err, resp) {

		if (err) {
	    	console.error('ERROR setting up har: ' + err);
	    	stopListening(proxy, proxyPort);
	    	//cb(error);
	        return;
	    }

	    cb();
	});
}

function stopListening(proxy, proxyPort) {
	proxy.stop(proxyPort, function() {});
}

function getHAR(proxy, proxyPort, cb) {
    proxy.getHAR(proxyPort, function(err, resp) {
    	if (err) {
	    	console.error('ERROR getting har: ' + err);
	    	stopListening(proxy, proxyPort);
	        return;
	    }
    	cb(resp);
    });
}

module.exports = {
	createProxy: createProxy,
    getHAR: getHAR,
	startProxy: startProxy,
	startListening: startListening,
	stopListening: stopListening
};

