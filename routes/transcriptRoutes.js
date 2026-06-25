const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getSemesterTranscript,
    getFullTranscript,
    getSemesterAverage,
    getTotalAverage
} = require("../controllers/transcriptController");


router.get(
    "/semester/:studentId/:semesterId",
    protect,
    authorize("student"),
    getSemesterTranscript
);


router.get(
    "/all/:studentId",
    protect,
    authorize("student"),
    getFullTranscript
);


router.get(
    "/semester-average/:studentId/:semesterId",
    protect,
    authorize("student"),
    getSemesterAverage
);


router.get(
    "/total-average/:studentId",
    protect,
    authorize("student"),
    getTotalAverage
);


module.exports = router;