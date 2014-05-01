var recordHAR = require('./lib/recordHAR'),
	webdriverjs = require("webdriverjs"),
    fs = require('fs');

var testUrl = "http://test.video.unrulymedia.com/leo-marmalade/leo.html?d=1396871430614#skid=166879247";
//var testUrl = "http://www.doyouyoga.com";
var harName = "leo.html.har";

var proxy = recordHAR.createProxy();
recordHAR.startProxy(proxy, function(proxyPort) {
    recordHAR.startListening(proxy, proxyPort, harName, function () {
        var proxyUrl = 'localhost' + ':' +  proxyPort;
        doSeleniumStuff(proxyUrl, function() {
            recordHAR.getHAR(proxy, proxyPort, function (harData) {
                console.log(harData);
                checkForImp(harData);
            });
        });
    });
});

function findMatchingEntries(har, stringToMatch) {
    var harEntries = har.log.entries;
    return harEntries.filter(function(entry) {
        return entry.request.url.indexOf(stringToMatch) !== -1;
    });
}

function checkForImp(data) {
	var har = JSON.parse(data),
	    imps = findMatchingEntries(har, "t=imp"),
	    hazImpreshun = imps.length > 0;

	if (hazImpreshun) {
		console.log('i can haz impreshun! ' + imps[0].request.url);
	} else {
		console.log('goddammit! :(');
	}
    fs.writeFileSync(harName, data, 'utf8');
}

function doSeleniumStuff(proxy, cb) {
    var browser = webdriverjs.remote({
        host: 'localhost'
        , port: 4444
        , desiredCapabilities: { browserName: 'firefox', seleniumProtocol: 'WebDriver', proxy: { httpProxy: proxy } }
    });

    browser
        .init()
        .url(testUrl)
        //.saveScreenshot('results.png')
        .end(cb);

}

