'use strict';

const moviesScrapper = require('./generators/simple-movies-scrapper');
const constants = require('./config/constants');

require('./config/mongoose')(constants.connectionString);

generateInParallel(10);

function generateInParallel(parallelRequestCount) {

    for (let i = 0; i < parallelRequestCount; i++) {

        moviesScrapper.generate();
    }
}
