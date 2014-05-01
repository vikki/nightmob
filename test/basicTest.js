var setup = require('../setUp/setupProxy');

module.exports = {
  setUp: function(self, cb) {
    setup.setupProxy(this, cb);
  },

  "Demo test Google" : function (browser) {
    browser
      .startHAR()
      .url("http://www.google.com")
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .assert.isRequestUrlMatching('clients1.google.com/ocsp')
      .assert.containsText('#main', 'IMDb')
      .stopHAR()
      .end();
  }
};