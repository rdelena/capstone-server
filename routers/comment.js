const express = require("express");
const commentController = require("../controllers/comment");
const router = express.Router();
const { verifyJwt } = require("../middleware/auth");

router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.post("/", commentController.postComment);
router.post("/:id/reply", commentController.postReply);
router.put("/:id", commentController.updateCommentById);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
