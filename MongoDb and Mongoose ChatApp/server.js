(function () {
    'use strict';

// IMPORTS ------------------------------
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var open = require('open');

    var apiRouter = require('./routes/apiRoutes');
    var port = process.env.PORT || 8080;
// ======================================

// CONFIG -------------------------------
    //database

    // use body parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // handle CORS
    app.use(function (req, res, next) {
        res.setHeader('access-control-allow-origin', '*');
        res.setHeader('access-control-allow-methods', 'GET', 'POST');
        res.setHeader('access-control-allow-headers', 'x-request-authorisation');

        next();
    });

    // log all requests on the console
    app.use(morgan('dev'));
// ======================================

// ROUTES -------------------------------
    // home page
    app.get('/', function (req, res) {
        res.send('<h1>Use the force Luke!</h1><p><em>Or a tool like Postman</em></p>');
    });

    // add the /api prefix
    app.use('/api', apiRouter);
// ======================================

    app.listen(port);
    console.log('You should go out more often... anyway we are running on port ' + port);

    open('http://localhost:' + port, function (err) {
        if (err) {throw err;}
    });
}());
