const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getGradesByCourse,
    addGrade,
    updateGrade
} = require("../controllers/gradeController");


router.get(
    "/course/:courseId",
    protect,
    authorize("professor"),
    getGradesByCourse
);


router.post(
    "/",
    protect,
    authorize("professor"),
    addGrade
);


router.put(
    "/:id",
    protect,
    authorize("professor"),
    updateGrade
);


module.exports = router;