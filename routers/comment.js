const express = require("express");
const commentController = require("../controllers/comment");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

router.get("/", verifyJwt, commentController.getAllComments);
router.post("/", verifyJwt, commentController.postComment);

module.exports = router;
