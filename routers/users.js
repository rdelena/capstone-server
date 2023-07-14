const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

router.get("/", verifyJwt, usersController.getAllUsers);
router.get("/:username", usersController.getUserByUsername);

module.exports = router;
