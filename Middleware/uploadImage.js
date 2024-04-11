// var multer = require('multer')

// // store image
// exports.storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '_' + file.originalname)
//     }
// })

const multer = require('multer');
const path = require('path');
const fs = require('fs')

// Define the destination directory
const uploadDir = path.join(__dirname, 'uploads');

// Ensure that the destination directory exists
const ensureUploadsDirExists = () => {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
};

// Middleware for uploading files
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadsDirExists(); 
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});