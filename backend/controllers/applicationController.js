const Application = require("../models/Application");

// Create Application
const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);

        res.status(201).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Applications
const getApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("studentId")
            .populate("jobId");

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Application
const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createApplication,
    getApplications,
    updateApplicationStatus,
    deleteApplication
};