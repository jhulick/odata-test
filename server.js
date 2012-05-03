var http = require('http'),
    url = require('url'), 
    httpProxy = require('http-proxy'),
    proxy = new httpProxy.RoutingProxy(),
    nodeStatic = require('node-static'),
    file = new nodeStatic.Server('./public');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname,
        segments = pathname.split('/');
    segments.shift();    
    if (segments[0] == 'OData' || segments[0] == 'Northwind') { 
        // do not preserve host header because the server would return 403
        req.headers['host'] = 'services.odata.org';
        proxy.proxyRequest(req, res, {
            host: 'services.odata.org',
            port: 80
        });        
    } else {    
        req.addListener('end', function () {
            file.serve(req, res);
        });
    }
}).listen(process.env.PORT);