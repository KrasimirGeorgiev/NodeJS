'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let ActorSchema = new Schema({

    role: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    imdbId: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    }
});

let Actor;

mongoose.model('Actor', ActorSchema);
Actor = mongoose.model('Actor');
module.exports = Actor;
