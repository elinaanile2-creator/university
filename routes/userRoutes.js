const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
} = require("../controllers/userController");


router.get(
    "/",
    protect,
    authorize("manager"),
    getUsers
);

router.get(
    "/:id",
    protect,
    authorize("manager"),
    getUser
);

router.post(
    "/",
    protect,
    authorize("manager"),
    createUser
);

router.put(
    "/:id",
    protect,
    authorize("manager"),
    updateUser
);

router.delete(
    "/:id",
    protect,
    authorize("manager"),
    removeUser
);

module.exports = router;