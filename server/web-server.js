exports.run = function () {

    const http = require('http');
    const fileSystem = require('fs');
    const path = require('path');

    http.createServer(function (request, response) {

        let filePath = '.' + request.url;
        if (filePath == './') {
            filePath = './index.html';
        }

        const fileExtensionName = String(path.extname(filePath)).toLowerCase();

        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png'
        };

        const contentType = mimeTypes[fileExtensionName] || 'application/octet-stream';

        fileSystem.readFile(filePath, function (error, content) {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
        });
        // TODO：ポート番号の検討
    }).listen(8080);
}