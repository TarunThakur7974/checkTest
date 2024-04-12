const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs');
const projectSchema = require("../Models/projectSchema");

const createProject = asyncHandler(async (req, res) => {
    const { projectName, mainHeading, subHeadings, subImg, pointsArr } = req.body;


    if (!projectName) {
        throw new Error("Please provide all the necessary details");
    }

    try {
        const newProject = await projectSchema.create({
            projectName,
            mainHeading,
            subHeadings,
            pointsArr,
            subImg,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: {
                _id: newProject._id,
                projectName: newProject.projectName,
                mainHeading: newProject.mainHeading,
                subHeadings: newProject.subHeadings,
                pointsArr: newProject.pointsArr,
                subImg: newProject.subImg,
            }
        });
    } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project");
    }
});



const updateProject = asyncHandler(async (req, res) => {
    const projectId = req.params.id;
    const { projectName, mainHeading, subHeadings, pointsArr, subImg } = req.body;

    if (!projectId || !projectName || !mainHeading || !subHeadings || !pointsArr || !subImg) {
        throw new Error("Please provide all the necessary details");
    }

    try {
        const updatedProject = await projectSchema.findByIdAndUpdate(
            projectId,
            { projectName, mainHeading, subHeadings, pointsArr, subImg },
            { new: true }
        );

        if (!updatedProject) {
            throw new Error("Project not found");
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: updatedProject
        });
    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Failed to update project");
    }
});

const getProject = asyncHandler(async (req, res) => {
    const projectId = req.params.id;

    if (!projectId) {
        return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    try {
        const project = await projectSchema.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            project: project
        });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ success: false, message: "Failed to fetch project" });
    }
});

const getAllProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await projectSchema.find();

        if (!projects || projects.length === 0) {
            return res.status(404).json({ success: false, message: "No projects found" });
        }

        res.status(200).json({
            success: true,
            count: projects.length,
            projects: projects
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }
});

const deleteProject = asyncHandler(async (req, res) => {
    const projectId = req.params.id;

    if (!projectId) {
        return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    try {
        const deletedProject = await projectSchema.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ success: false, message: "Failed to delete project" });
    }
});

module.exports = {
    createProject,
    updateProject,
    getProject,
    getAllProjects,
    deleteProject
}
