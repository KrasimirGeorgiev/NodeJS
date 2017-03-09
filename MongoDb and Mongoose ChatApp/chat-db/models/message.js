(function () {
    'use strict';
// IMPORTS ----------------------------------
    var mongoose = require('mongoose');

    var constants = require('./constants');
// ==========================================

// MAIN -------------------------------------
    var MessageSchema = new mongoose.Schema({
        from: {type: String, required: true, match: constants.USERNAME_PATTERN},
        to: {type: String, required: true, match: constants.USERNAME_PATTERN},
        text: {type: String, required: true},
        sentOn: Date
    });
// ==========================================

    module.exports = mongoose.model('Message', MessageSchema);
}());
