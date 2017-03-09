'use strict';

const constants = require('../config/constants');
const urlGenerator = require('./url-generator');
const moviesGenerator = require('./movies-generator');

urlGenerator.config({
    genres: constants.genres,
    pagesCount: constants.pagesCount
});

let urlQueue = urlGenerator.createUrlsQueue();

moviesGenerator.config({ urlQueue });

module.exports = {
    generate
};

function generate() {

    return moviesGenerator.generateMovies();
}