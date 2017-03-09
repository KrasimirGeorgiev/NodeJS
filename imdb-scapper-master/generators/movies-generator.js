'use strict';

const httpRequester = require('../utils/http-requester');
const htmlParser = require('../utils/html-parser');
const modelsFactory = require('../models');
const timeoutUtils = require('../utils/timeout');

require('colors');

let urlQueue;
let waitDuration = 1000;

module.exports = {
    config,
    generateMovies
};

/**
 * @param {Queue<String>} params.urlQueue
 * @param {int} [params.waitDuration] - time to wait between requests in milliseconds
 * default is 1000
 * @returns {void}
 */
function config(params) {
    urlQueue = params.urlQueue || urlQueue;
    waitDuration = params.waitDuration || waitDuration;
}

function generateMovies() {

    return nextOrDie()
        .then(() => timeoutUtils.wait(waitDuration))
        .then(generateMovies)
        .catch((err) => console.dir(err, { colors: true }));
}

function nextOrDie() {
    if (urlQueue.isEmpty()) {
        return Promise.resolve();
    }

    return getMoviesFromUrl(urlQueue.pop());
}

/**
 * Parses a page of movies
 * @param url
 * @returns {Promise}
 */
function getMoviesFromUrl(url) {
    console.log(`Working with ${url.italic.green}`);

    return httpRequester.get(url)
                 .then(parseToMoviesDataObjects)
                 .then(mapToDbModels)
                 .then(modelsFactory.insertManySimpleMovies);
}

function parseToMoviesDataObjects(result) {
    const selector = '.col-title span[title] a';
    const html = result.body;

    let simpleMovies = htmlParser.parseSimpleMovie(selector, html);

    return simpleMovies;
}

function mapToDbModels(movies) {
    let dbMovies = movies.map(movie => {
        return modelsFactory.getSimpleMovie(movie.title, movie.url);
    });

    return dbMovies;
}