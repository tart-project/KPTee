exports.run = function () {

    var http = require('http');
    var fileSystem = require('fs');
    var path = require('path');

    http.createServer(function (request, response) {

        var filePath = '.' + request.url;
        if (filePath == './') {
            filePath = './index.html';
        }

        var extname = String(path.extname(filePath)).toLowerCase();
        var mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png'
        };

        var contentType = mimeTypes[extname] || 'application/octet-stream';

        fileSystem.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fileSystem.readFile('./404.html', function (error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });

    }).listen(8080);


}