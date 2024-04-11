const mongoose = require('mongoose');

const projectIMG = new mongoose.Schema({
    idOne: {
        type: Number
    },
    idTwo: {
        type: Number
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('projectImage', projectIMG)