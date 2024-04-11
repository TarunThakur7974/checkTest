const express = require('express')
const app = express();
const cors = require('cors');
const multer = require('multer')

require('dotenv').config()
const ConnectToMongo = require('./Database');
const { errorHandler } = require('./errorHandler');
const port = process.env.PORT || 5500

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

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
 