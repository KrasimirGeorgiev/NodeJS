'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actor = require('./actor').schema;

let MovieDetailsSchema = new Schema({
    forMovieId: {
        type: Schema.ObjectId,
        ref: 'SimpleMovie'
    },

    description: {
        type: String,
        required: true
    },

    coverUrls: {
        type: [String],
        required: true
    },

    trailerUrl: {
        type: String,
        required: false
    },

    genres: {
        type: [String],
        required: true
    },

    releaseDate: {
        type: Date,
        required: true
    },

    actors: {
        type: [Actor],
        required: true
    }
});

let MovieDetails;

mongoose.model('MovieDetails', MovieDetailsSchema);
MovieDetails = mongoose.model('MovieDetails');
module.exports = MovieDetails;
