To get this to work :

You'll need to install the node deps with
	
	npm install

You will also need :

	- [browsermob-proxy](http://bmp.lightbody.net/)
	- [selenium server](http://docs.seleniumhq.org/download/)

Then you'll need to start both. index.js is expecting selenium to be running on port 4444 and browsermob-proxy to be running on 8080, which is the default right now, but you never know!

	$ java -jar ./selenium-server-standalone-<VERSION>.jar 

	$ sh browsermob-proxy

You should then be able to run nightwatch against test/basicTest.js and it will verify that a request was made - this happens due to the assertions, commands and setup that have been created - which are registered in settings.json. Proper README to follow :)
