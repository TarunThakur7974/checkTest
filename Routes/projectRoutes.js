const multer = require('multer');
const { getProject, createProject, updateProject, getAllProjects, deleteProject } = require('../Controlers/projectControl');
const { createProjectImg, getImage } = require('../Controlers/ImageControl');
const { storage } = require('../server');
const router = require('express').Router();

const upload = multer({ storage: storage })
router.post('/uploadImg', upload.single('image'), createProjectImg)
router.get('/getImg/:image', getImage);
// router.put('/updateBanner/:id', upload.single('image'),)
// router.delete('/deleteBanner/:id',)

router.post('/createProject', createProject);
router.put('/updateProject/:id', updateProject);
router.get('/getAllProjects', getAllProjects);
router.get('/getProject/:id', getProject);
router.delete('/deleteProject/:id', deleteProject);

module.exports = router

