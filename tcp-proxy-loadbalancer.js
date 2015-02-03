/**
 * tcp proxy
 * 
 * @reference https://www.npmjs.com/package/tcp-proxy
 */
var net = require('net');
var TcpProxy = require('tcp-proxy');
var LOG = require('winston');

console.log('service start');

var targets = [ {
    host : 'localhost',
    port : 5672
}, {
    host : 'localhost',
    port : 5673
}, {
    host : 'localhost',
    port : 5674
} ];

var nextProxy = function() {
    var target = targets.shift();
    targets.push(target);
    return target;
};

var server = net.createServer(function(socket) {
    var oNextProxy = nextProxy();

    console.log("next proxy port is " + oNextProxy.port);

    new TcpProxy().proxy(socket, {
	target : oNextProxy
    });
});

server.listen(9000);