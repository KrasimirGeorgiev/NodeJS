'use strict';

const queuesFactory = require('../data-structures/queue');

let genres = [];
let pagesCount = 50;

module.exports = {
    config,
    createUrlsQueue
};

/**
 * @param {Array<String>} params.genres
 * @param {int} params.pagesCount
 */
function config(params) {
    genres = params.genres || genres;
    pagesCount = params.pagesCount || pagesCount;
}

/**
 * @throws {Error} When no configuration is set
 */
function createUrlsQueue() {
    let urlsQueue = queuesFactory.getQueue();

    if (genres.length === 0) {
        throw new Error('Genres are not set. Use `config({genres: [...]})` to set genres');
    }

    genres.forEach(genre => {
        for (let i = 0; i < pagesCount; i += 1) {
            let url = createUrl(genre, i);

            urlsQueue.push(url);
        }
    });

    return urlsQueue;
}

function createUrl(genre, page) {
    let url = [
        `http://www.imdb.com/search/title?genres=${genre}`,
        `&title_type=feature`,
        `&0sort=moviemeter,asc`,
        `&page=${page + 1}`,
        `&view=simple`,
        `&ref_=adv_nxt`
    ].join('');

    return url;
}