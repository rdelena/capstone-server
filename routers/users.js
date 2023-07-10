const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

router.get("/", verifyJwt, usersController.getAllUsers);
// router.get("/:id", usersController.getUserById);
// router.post("/", usersController.createUser);
// router.put("/:id", usersController.updateUserById);
// router.delete("/:first_name", usersController.deleteUserByFirstName);

module.exports = router;
