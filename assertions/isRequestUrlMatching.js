var recordHAR = require('../commands/lib/recordHAR');
var util = require('util');
var events = require('events');

exports.assertion = function(requestUrlMatcher) {
    //console.log("asserting jazz");
    //console.log("asserting jazz " + requestInfo);
    events.EventEmitter.call(this);

    /**
     * The message which will be used in the test output and
     * inside the XML reports
     * @type {string}
     */
    this.message = "Found request URL matching " + requestUrlMatcher;

    /**
     * A value to perform the assertion on. If a function is
     * defined, its result will be used.
     * @type {function|*}
     */
    this.expected = requestUrlMatcher;

    /**
     * The method which performs the actual assertion. It is
     * called with the result of the value method as the argument.
     * @type {function}
     */
    this.pass = function(value) {
         var matchingEntries = findMatchingEntries(value, this.expected);
         return matchingEntries.length > 0;
    };

    function findMatchingEntries(har, stringToMatch) {
        var harEntries = har.log.entries;
        return harEntries.filter(function(entry) {
            return entry.request.url.indexOf(stringToMatch) !== -1;
        });
    }

    /**
     * The method which returns the value to be used on the
     * assertion. It is called with the result of the command's
     * callback as argument.
     * @type {function}
     */
    this.value = function(result) {
        return JSON.parse(result);
    };

    /**
     * Performs a protocol command/action and its result is
     * passed to the value method via the callback argument.
     * @type {function}
     */
    this.command = function(callback) {
        var self = this;
        //this.api.getText("body", function() {});  // line included only as a hack to get nightwatch flow to work
        recordHAR.getHAR(this.api.proxy, this.api.proxyPort, function(har) {
            callback(har);
            self.emit('complete');
        });

        return this;
    };

};