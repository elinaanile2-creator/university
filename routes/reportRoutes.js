const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getStudentsReport,
    getProfessorsReport,
    getCoursesReport,
    getStudentsCountPerCourse,
    searchStudent,
    searchCourse
} = require("../controllers/reportController");


router.get(
    "/students",
    protect,
    authorize("manager"),
    getStudentsReport
);

router.get(
    "/professors",
    protect,
    authorize("manager"),
    getProfessorsReport
);

router.get(
    "/courses",
    protect,
    authorize("manager"),
    getCoursesReport
);

router.get(
    "/course-students-count",
    protect,
    authorize("manager"),
    getStudentsCountPerCourse
);

router.get(
    "/student/:studentNumber",
    protect,
    authorize("manager"),
    searchStudent
);

router.get(
    "/course/:courseCode",
    protect,
    authorize("manager"),
    searchCourse
);


module.exports = router;