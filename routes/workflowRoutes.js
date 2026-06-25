const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getWorkflowStatus,
    updateEnrollmentStatus,
    updateGradingStatus
} = require("../controllers/workflowController");


router.get(
    "/",
    protect,
    authorize("manager"),
    getWorkflowStatus
);


router.put(
    "/enrollment",
    protect,
    authorize("manager"),
    updateEnrollmentStatus
);


router.put(
    "/grading",
    protect,
    authorize("manager"),
    updateGradingStatus
);


module.exports = router;