To get this to work :

You'll need to install the node deps with
	
	npm install

You will also need :

	- [browsermob-proxy](http://bmp.lightbody.net/)
	- [selenium server](http://docs.seleniumhq.org/download/)

Then you'll need to start both. index.js is expecting selenium to be running on port 4444 and browsermob-proxy to be running on 8080, which is the default right now, but you never know!

	$ java -jar ./selenium-server-standalone-<VERSION>.jar 

	$ sh browsermob-proxy

then node index.js should request an ad and check if it requests an impression. Whoo :D
