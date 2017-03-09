(function () {
    'use strict';
    module.exports = {
        NAME_PATTERN: /^[A-Z][a-z]{1,20}$/,
        USERNAME_PATTERN: /^[a-z\-]{3,24}$/,
        PASSWORD_PATTERN: /^[^\s]{4,24}$/
    };
}());
