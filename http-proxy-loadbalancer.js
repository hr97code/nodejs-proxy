/**
 * http proxy
 * 
 * @reference https://www.npmjs.com/package/http-proxy
 * @reference https://github.com/nodejitsu/node-http-proxy/blob/master/UPGRADING.md
 */
var http = require('http'), httpProxy = require('http-proxy'), winston = require('winston');

console.log('starting server...');

var targets = [ {
    host : 'localhost',
    port : 4000
}, {
    host : 'localhost',
    port : 5000
} ];

var proxy = httpProxy.createProxyServer();

var nextProxy = function() {
    var target = targets.shift();
    targets.push(target);
    return target;
};

http.createServer(function(req, res) {
    console.log('# server port 9000');

    var oNextProxy = nextProxy();

    winston.log('info', 'forward to ' + oNextProxy.host + ':' + oNextProxy.port);

    proxy.web(req, res, {
	target : oNextProxy
    });

}).listen(9000);

/**
 * HTTP server, listening port 5000
 */
http.createServer(function(req, res) {
    console.log('[listen] server port 5000');

    res.writeHead(200, {
	'Content-Type' : 'text/plain'
    });
    res.write('request success\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(5000);

/**
 * HTTP server, listening port 4000
 */
http.createServer(function(req, res) {
    console.log('[listen] server port 4000');

    res.writeHead(200, {
	'Content-Type' : 'text/plain'
    });
    res.write('request success\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(4000);

console.log('started server... OK');

/*
 * http.createServer(function(req, res) { proxy.web(req, res, { target :
 * 'http://localhost:5000'}) })
 */

