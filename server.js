const express = require('express')
const app = express();
const cors = require('cors');
const multer = require('multer')

require('dotenv').config()
const ConnectToMongo = require('./Database');
const { errorHandler } = require('./errorHandler');
const port = process.env.PORT || 5500

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

ConnectToMongo()
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./Routes/projectRoutes'));
app.use(errorHandler)

app.listen(port, () => {
    console.log("Server is running" + port)
})
 