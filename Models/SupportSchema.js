const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
    supportName: {
        type: String,
        required: [true, 'Please enter a project name']
    },
    mainHeading: {
        type: Array,
        required: [true, 'Please enter main headings']
    },
    subHeadings: {
        type: Array,
        required: [true, 'Please enter sub headings']
    },
    image: {
        type: String,
        required: [true, 'Please enter sub images']
    },
    pointsArr: {
        type: Array,
        required: [true, 'Please enter pointArr']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('SupportSchema', SupportSchema)