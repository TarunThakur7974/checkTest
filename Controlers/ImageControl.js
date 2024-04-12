const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs');
const projectSchema = require("../Models/projectSchema");
const projectImg = require("../Models/imageSchema");
const imageSchema = require("../Models/imageSchema");

const createProjectImg = asyncHandler(async (req, res) => {
    try {
        const newProjectImg = await projectImg.create({
            image: req.file.path,
        });

        res.status(201).json({
            success: true,
            message: "Image created successfully",
            project: {
                image: newProjectImg.image,
            }
        });
    } catch (error) {
        console.log(error);
    }
});
const getImage = asyncHandler(async (req, res) => {
    try {
        const imageUrl = req.params.image; // Assuming you're passing the image URL as a parameter
        // Validation
        if (!imageUrl) return res.status(400).json({ success: false, message: 'imageUrl is required' });

        // Query the database to find the image based on the imageUrl
        const projectImg = await imageSchema.findById(imageUrl);
        console.log(imageUrl)
        // If image is found, return it
        if (projectImg) {
            res.status(200).json({
                success: true,
                message: "Image retrieved successfully",
                project: {
                    image: projectImg.image,
                }
            });
        } else {
            // If image is not found, return an appropriate message
            res.status(404).json({ success: false, message: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = {
    createProjectImg,
    getImage,
}