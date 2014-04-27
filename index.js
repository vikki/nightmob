var Proxy = require('browsermob-proxy').Proxy,
	webdriverjs = require("webdriverjs"),
    fs = require('fs');

// assumes proxy is running on localhost:4444
//var proxy = new Proxy();

var proxy = new Proxy({ host: 'localhost', port: 8080 });
//proxy.setHttpProxy("localhost:8080");

var testUrl = "http://test.video.unrulymedia.com/leo-marmalade/leo.html?d=1396871430614#skid=166879247";
//var testUrl = "http://www.doyouyoga.com";
var harName = "leo.html.har";

function checkForImp(data) {
	//console.log('har data ' + data);
	var har = JSON.parse(data);
	
	function findMatchingEntries(har, stringToMatch) {
		var harEntries = har.log.entries;
		return harEntries.filter(function(entry) {
			return entry.request.url.indexOf(stringToMatch) !== -1;
		});
	}

	var imps = findMatchingEntries(har, "t=imp");
	var hazImpreshun = imps.length > 0;
	if (hazImpreshun) {
		console.log('i can haz impreshun! ' + imps[0].request.url);
	} else {
		console.log('goddammit! :(');
	}
    fs.writeFileSync(harName, data, 'utf8');
}

var currentPort;

function startListening(cb) {
	proxy.start(function(err, data) {
	    if (err) {
	    	console.error('ERROR starting proxy : ' + err);
	        return;
	    }

	    currentPort = data.port;
	    
	    proxy.startHAR(currentPort, testUrl, function(err, resp) {
			if (err) {
		    	console.error('ERROR setting up har: ' + err);
		    	stopListening();
		        return;
		    }

		    cb();
		    
	    });
	});
}

function stopListening() {
	proxy.stop(currentPort, function() {});
}

function doStuff(cb) {
    doSeleniumStuff('localhost' + ':' +  currentPort, cb);
}

function assertStuff(cb) {
	//console.log('assert stuff');
    proxy.getHAR(currentPort, function(err, resp) {
    	if (err) {
	    	console.error('ERROR getting har: ' + err);
	    	stopListening();
	        return;
	    }
    	checkForImp(resp);
    	cb();
    });
}

function doSeleniumStuff(proxy, cb) {
    var browser = webdriverjs.remote({
        host: 'localhost'
        , port: 4444
        , desiredCapabilities: { browserName: 'firefox', seleniumProtocol: 'WebDriver', proxy: { httpProxy: proxy } }
    });

    //console.log('do sel');

    browser
        .init()
        .url(testUrl)
        //.saveScreenshot('results.png')
        .end(cb);

      // console.log('do sel stuff soon');
}

// cough promises cough
startListening(function () {
	doStuff(function() {
		//console.log('cb');
		assertStuff(stopListening);
	});
});

