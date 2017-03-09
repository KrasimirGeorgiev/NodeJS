(function () {
    'use strict';
// IMPORTS ----------------------------------
    var mongoose = require('mongoose');

    var User = require('./models/user');
    var Message = require('./models/message');
// ==========================================

// CONFIG -----------------------------------
    var dbUrl = 'mongodb://localhost:27017/chat-db';
    mongoose.connect(dbUrl);

    var db = mongoose.connection;
    db.on('error', function (err) {
        console.log('Database raised an error: ', err);
    });
// ==========================================

// MAIN -------------------------------------
    function registerUser(userData) {
        var user = new User(userData);

        return user.save(function (err) {
            if (err) {throw err;}
        });
    }

    function sendMessage(messageData) {
        var message = new Message(messageData);
        message.sentOn = new Date();

        return message.save(function (err) {
            if (err) {throw err;}
        });
    }

    function getMessages(queryData) {
        var names = [queryData.with, queryData.and];
        var messages = Message
            .where('from').in(names)
            .where('to').in(names)
            .sort('-sentOn')
            .limit(queryData.limit)
            .select('text from sentOn');

        // returns a query fetch with .exec(err, data)
        return messages;
    }
// ==========================================

// EXPORTS ----------------------------------
    module.exports = {
        registerUser: registerUser,
        sendMessage: sendMessage,
        getMessages: getMessages
    };

    // Methods signature:
    // registerUser({user: String, password: String})
    // sendMessage({from: 'user', to: 'user', text: String})
    // getMessages({with: 'user', and: 'user'})
    // returns a query get results by -> .exec(function(err, data))
// ==========================================
}());