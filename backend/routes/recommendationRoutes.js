const express = require("express");

const {
    getRecommendedJobs
} = require("../controllers/recommendationController");

const router = express.Router();

router.get("/:studentId", getRecommendedJobs);

module.exports = router;