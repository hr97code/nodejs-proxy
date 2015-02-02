/**
 * http proxy
 * @reference https://www.npmjs.com/package/http-proxy
 */
var http = require('http'), httpProxy = require('http-proxy');

httpProxy.createProxyServer({
	target : 'http://localhost:5000'
}).listen(8000);

http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.write('request success\n' + JSON.stringify(req.headers, true, 2));
	res.end();
}).listen(5000);

console.log('started server...');

/*
http.createServer(function(req, res) {
	proxy.web(req, res, { target : 'http://localhost:5000'})
})
*/

