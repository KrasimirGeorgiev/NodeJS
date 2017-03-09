'use strict';

module.exports = {
    wait
};

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
