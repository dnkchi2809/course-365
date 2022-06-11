const express = require("express");

const router = express.Router();

const {createCourse,getAllCourse,getCourseById,updateCourseById,deleteCourseById} = require("../controllers/courseController")

router.post("/course", createCourse)

router.get("/course", getAllCourse)

router.get("/course/:courseId", getCourseById)

router.put("/course/:courseId", updateCourseById)

router.delete("/course/:courseId", deleteCourseById)

module.exports = router;