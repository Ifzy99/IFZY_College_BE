const express = require("express");

const {getCourses, addCourse, getCourse, updateCourse, deleteCourse} = require("../controllers/courseController");

const Course = require("../models/Course");

const router = express.Router({mergeParams: true});

const advancedResults = require("../middleware/advancedResults");


const {protect, authorize} = require("../middleware/auth");


router.route("/").get(advancedResults(Course, {
    path: "programme",
    select: "name description"
}), getCourses).post(protect, authorize("admin"), addCourse)

router.route("/:id").get(getCourse).put(protect, authorize("staff", "admin"), updateCourse).delete(protect, authorize("staff", "admin"), deleteCourse)


module.exports = router