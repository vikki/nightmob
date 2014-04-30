var recordHAR = require('../commands/lib/recordHAR');

module.exports = {
  setUp: function(self, cb) {
    self.proxy = recordHAR.createProxy();
    recordHAR.startProxy(self.proxy, function(proxyPort) {
        var proxyUrl = 'localhost' + ':' +  proxyPort;
        console.log('browsermob proxy listening on ' + proxyUrl);

        self.desiredCapabilities.proxy = { httpProxy: proxyUrl };

        self.proxyPort = proxyPort;

        cb();
    })
  },

  "Demo test Google" : function (browser) {
    browser
      .startHAR("ergh")
      .url("http://www.google.com")
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
        .assert.containsText('#main', 'The Night Watch')
      .assert.isRequestUrlMatching('clients1.google.com/ocsp')
        .assert.containsText('#main', 'IMDb')
      .stopHAR("ergh")
      .end();
  }
};