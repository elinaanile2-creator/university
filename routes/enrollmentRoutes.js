const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getEnrollments,
    enrollCourse,
    deleteEnrollment
} = require("../controllers/enrollmentController");


router.get(
    "/student/:studentId",
    protect,
    authorize("student"),
    getEnrollments
);


router.post(
    "/",
    protect,
    authorize("student"),
    enrollCourse
);


router.delete(
    "/:id",
    protect,
    authorize("student"),
    deleteEnrollment
);


module.exports = router;