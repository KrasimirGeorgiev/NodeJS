(function () {
    'use strict';

    var apiRouter = require('express').Router();
    var User = require('../chat-db/models/user');
    var jwt = require('jsonwebtoken');

    var chatDb = require('../chat-db/chat-db');
    var publicSecret = 'hotmaildotcom';

// ROUTES -------------------------------
    // request authentication
    apiRouter.post('/authenticate', function (req, res) {
        User.findOne({
            username: req.body.username
        })
            .select('firstname lastname username password')
            .exec(function (err, user) {
                if (err) {throw err;}

                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Invalid username!'
                    });
                } else {
                    var isValidPass = user.comparePassword(req.body.password);
                    if (!isValidPass) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password!'
                        });
                    } else {
                        var token = jwt.sign({
                            firstname: user.firstname,
                            lastname: user.lastname,
                            username: user.username
                        }, publicSecret, {
                            expiresInMinutes: 1440
                        });

                        res.json({
                            success: true,
                            message: 'Here is your token my sir',
                            token: token
                        });
                    }
                }
            });
    });

    // GET /api
    apiRouter.get('/', function (req, res) {
        res.json({message: 'It seems you finally made it, awesome!'});
    });

    apiRouter.route('/me')
        .get(function (req, res) {
            res.send(req.decoded);
        })
        .put(function (req, res) {
            User.findOne(req.decoded.username, function (err, user) {
                if (err) {res.send(err);}

                if (req.body.username) {user.username = req.body.username;}
                if (req.body.password) {user.password = req.body.password;}
                if (req.body.firstname) {user.firstname = req.body.firstname;}
                if (req.body.lastname) {user.lastname = req.body.lastname;}

                user.save(function (err) {
                    if (err) {res.send(err);}

                    res.json({message: 'User updated'});
                });
            });
        });

    apiRouter.route('/users')
        .post(function (req, res) {
            var user = new User();

            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.username = req.body.username;
            user.password = req.body.password;

            user.save(function (err) {
                if (err) {
                    // duplicate
                    if (err.code === 11000) {
                        return res.json({success: false, message: 'username already exists'});
                    } else {
                        return res.send(err);
                    }
                }

                res.json({message: 'User created'});
            });
        })
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err) {
                    throw err;
                }

                res.json(users);
            });
        });

    // middleware for the routes below
    apiRouter.use(function (req, res, next) {
        console.log('Wake up, somebody is using the app');

        var token = req.body.token ||
            req.query.token ||
            req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, publicSecret, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Invalid authentication token!'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'Authentication token is missing'
            });
        }
    });

    apiRouter.route('/users/:userId')
        .get(function (req, res) {
            User.findById(req.params.userId, function (err, user) {
                if (err) {res.send(err);}

                res.json(user);
            });
        })
        .put(function (req, res) {
            assertIsAdmin(req, res);

            User.findById(req.params.userId, function (err, user) {
                if (err) {res.send(err);}

                if (req.body.username) {user.username = req.body.username;}
                if (req.body.password) {user.password = req.body.password;}
                if (req.body.firstname) {user.firstname = req.body.firstname;}
                if (req.body.lastname) {user.lastname = req.body.lastname;}

                user.save(function (err) {
                    if (err) {res.send(err);}

                    res.json({message: 'User updated'});
                });
            });
        })
        .delete(function (req, res) {
            assertIsAdmin(req, res);

            User.remove({
               _id: req.params.userId
            }, function (err, user) {
                if (err) {res.send(err);}

               res.json({message: 'Successfully deleted'});
            });
        });

    apiRouter.route('/messages')
        .post(function (req, res) {
            var message = {
                from: req.decoded.username,
                to: req.body.to,
                text: req.body.text
            };

            chatDb.sendMessage(message)
                .then(function () {
                    res.json({
                        success: true,
                        message: 'Message sent'
                    });
                }, function (err) {
                    res.status(400).send(err);
                });
        })
        .get(function (req, res) {
            if (!req.query.with) {
                res.status(400).json({
                    success: false,
                    message: 'You must specify query parameter "with" the username with which you have common messages'
                });
            } else {
                chatDb.getMessages({
                    with: req.query.with,
                    and: req.decoded.username,
                    limit: +req.query.limit || 0 // if NaN no limit
                }).exec(function (err, messages) {
                    if (err) {res.status(400).send(err);}

                    res.send(messages);
                });
            }
        });

    function assertIsAdmin(req, res) {
        if (req.decoded.username !== 'admin') {
            res.status(400).send('You need administrator privileges for this action');
        }
    }
// ======================================

    module.exports = apiRouter;
}());
