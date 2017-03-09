(function () {
    'use strict';
// IMPORTS ----------------------------------
    var mongoose = require('mongoose');
    var bcrypt = require('bcrypt-nodejs');

    var constants = require('./constants');
// ==========================================

// MAIN -------------------------------------
    var UserSchema = new mongoose.Schema({
        firstname: {type: String, match: constants.NAME_PATTERN},
        lastname: {type: String, match: constants.NAME_PATTERN},
        username: {
            type: String,
            required: true,
            index: {unique: true},
            match: constants.USERNAME_PATTERN},
        password: {
            type: String,
            required: true,
            select: false,
            match: constants.PASSWORD_PATTERN}
    });

    UserSchema.pre('save', function (next) {
        var user = this;

        // hash te password only if modified
        if (!user.isModified('password')) {
            return next();
        }

        bcrypt.hash(user.password, null, null, function (err, hash) {
            if (err) {
                throw err;
            }

            user.password = hash;
            next();
        });
    });

    UserSchema.methods.comparePassword = function comparePassword(password) {
        var user = this;

        return bcrypt.compareSync(password, user.password);
    };
// ==========================================

    module.exports = mongoose.model('User', UserSchema);
}());
