const express = require("express");
const protect = require("../middleware/auth");

const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

router.post("/", protect, createStudent);

router.get("/", protect, getStudents);

router.get("/:id", protect, getStudentById);

router.put("/:id", protect, updateStudent);

router.delete("/:id", protect, deleteStudent);

module.exports = router;