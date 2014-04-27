var Proxy = require('browsermob-proxy').Proxy,
    fs = require('fs');

// assumes proxy is running on localhost:4444
//var proxy = new Proxy();

var proxy = new Proxy({ host: 'localhost', port: 8080 });
//proxy.setHttpProxy("localhost:8080");

var testUrl = "http://test.video.unrulymedia.com/leo-marmalade/leo.html?d=1396871430614#skid=166879247";
//var testUrl = "http://www.doyouyoga.com";
var harName = "leo.html.har";

function checkForImp(data) {
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
    //fs.writeFileSync(harName, data, 'utf8');
}


proxy.doHAR(testUrl, function(err, data) {
    if (err) {
        console.error('ERROR: ' + err);
    } else {
    	checkForImp(data);
    }
});

