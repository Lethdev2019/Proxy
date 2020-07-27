// adcharirt

var http = require('http');
var url = require('url');
var request = require('request');

const path = require("path");
const fs = require("fs");

var server = http.createServer(function(req, res) {  
    var path = url.parse(req.url).pathname;  
    switch (path) {  
        case '/':  
            fs.readFile('index.html', function(error, data) {  
                if (error) {  
                    res.writeHead(404);  
                    res.write(error);  
                    res.end();  
                } else {  
                    res.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    res.write(data);  
                    res.end();  
                }  
            });  
            break;  
        case '/proxy':  
        	var queryData = url.parse(req.url, true).query;
				if (queryData.url) {
					request({
						url: queryData.url
					}).on('error', function(e) {
						res.end(e);
					}).pipe(res);
				}
				else {
					res.end("no url found");
				}
            break;  
        default:  
            res.writeHead(404);  
            res.write("opps this doesn't exist - 404");  
            res.end();  
            break;  
    }  
});  
function onRequest(req, res) {

    var queryData = url.parse(req.url, true).query;
    if (queryData.url) {
        request({
            url: queryData.url
        }).on('error', function(e) {
            res.end(e);
        }).pipe(res);
    }
    else {
        res.end("no url found");
    }
}
server.listen(8082);  
//https://Proxy.adcharity.repl.co/?url=[your_url]
