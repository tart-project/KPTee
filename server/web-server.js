exports.run = function () {

    const http = require('http');
    const fileSystem = require('fs');
    const path = require('path');

    http.createServer(function (request, response) {

        let filePath = '.' + request.url;
        if (filePath == './') {
            filePath = './index.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

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
        // TODO：ポート番号の検討
    }).listen(8080);
}