const mongoose = require('mongoose');

const projectIMG = new mongoose.Schema({
    image: {
        type: String,
    }
});

module.exports = mongoose.model('projectImage', projectIMG)