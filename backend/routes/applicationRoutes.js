const express = require("express");

const {
    createApplication,
    getApplications,
    updateApplicationStatus,
    deleteApplication
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/", createApplication);

router.get("/", getApplications);

router.put("/:id", updateApplicationStatus);

router.delete("/:id", deleteApplication);

module.exports = router;