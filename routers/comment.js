const express = require("express");
const commentController = require("../controllers/comment");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

router.get("/", commentController.getAllComments);
router.post("/", commentController.postComment);

module.exports = router;
