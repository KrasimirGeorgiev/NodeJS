/**
 * Created by kidroca on 8.1.2016 г..
 */
(function () {
    'use strict';
    var PORT = 4040;
    var URL = 'http://localhost';

    var http = require('http');
    var fs = require('fs');
    var open = require('open');
    var uuid = require('node-uuid');

    function filesController(request, response) {
        if (request.method === 'GET') {
            var path = request.url.slice(1);
            if (fs.existsSync(path)) {
                response.writeHead(200, 'OK', {
                    'content-description': 'File Transfer',
                    'content-type': 'application/octet-stream',
                    'content-disposition': 'attachment',
                    'content-transfer-encoding': 'binary'
                });
                readFile(path, response);
            } else {
                response.writeHead(404, 'Not found');
                response.end();
            }
        } else if (request.method === 'POST') {
            var filename = generateFileName(request);

            var writeStream = fs.createWriteStream('files/' + filename);
            request.pipe(writeStream);
            request.on('end', function () {
                response.writeHead(201, 'Created successfully', {
                    'content-type': 'application-json'
                });
                response.write(JSON.stringify({ location: 'files/' + filename }));
                response.end();
            });

            writeStream.on('error', function (error) {
                console.log(error);
            });
        } else {
            response.writeHead(404, 'Not found');
            response.end();
        }
    }

    function showHome(response) {
        response.writeHead(200, {
            'content-type': 'text/html'
        });

        readFile('index.html', response);
    }

    function loadComponent(path, response) {
        response.writeHead(200, {
            'content-type': 'text/javascript'
        });

        if (fs.existsSync(path)) {
            readFile(path, response);
        } else {
            response.writeHead(404, 'Not found');
            response.end();
        }
    }

    function generateFileName(request) {
        var id = uuid.v4();
        var extension = '';
        var originalName = request.headers['x-original-name'];
        var contentType = request.headers['content-type'];
        if (originalName) {
            var dotSplit = originalName.split('.');
            extension = '.' + dotSplit[dotSplit.length - 1];
        } else if (contentType) {
            extension = '.' + contentType.split('/')[1];
        }

        return id + extension;
    }

    function readFile(path, response, errorCallback) {
        fs.readFile(path, function (error, file) {
            if (error) {
                if (errorCallback) {
                    errorCallback(error);
                } else {
                    throw error;
                }
            }

            response.write(file);
            response.end();
        });
    }

    http.createServer(function (request, response) {
        var path = request.url;
        if (path === '/') {
            showHome(response);
        } else if(path.indexOf('bower_components') !== -1) {
            loadComponent(path.slice(1), response);
        } else if (path === '/running') {
            response.writeHead(200, 'We are up!');
            response.end();
        } else if (path.indexOf('files') !== -1) {
            filesController(request, response);
        } else {
            response.writeHead(404, 'Not found');
            response.end();
        }
    }).listen(PORT);

    console.log('Server is walking on ' + URL + ':' + PORT);

    open(URL + ':' + PORT, function (err) {
        if (err) console.log('The user closed the browser');
    });
}());