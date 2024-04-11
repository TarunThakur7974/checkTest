const mongoose = require('mongoose');


const projectShema = new mongoose.Schema({
    projectName: {
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
    subImg: {
        type: Array,
        required: [true, 'Please enter sub images']
    },
    pointsArr: {
        type: Array,
        required: [true, 'Please enter pointArr']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Project', projectShema)