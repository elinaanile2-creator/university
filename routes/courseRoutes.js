const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");


router.get(
    "/",
    protect,
    getCourses
);

router.get(
    "/:id",
    protect,
    getCourse
);

router.post(
    "/",
    protect,
    authorize("manager"),
    createCourse
);

router.put(
    "/:id",
    protect,
    authorize("manager"),
    updateCourse
);

router.delete(
    "/:id",
    protect,
    authorize("manager"),
    deleteCourse
);

module.exports = router;