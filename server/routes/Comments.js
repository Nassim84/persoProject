const express = require("express");
const router = express.Router();
const {
	createComment,
	getCommentsByPostId,
	updateComment,
	deleteComment,
} = require("../controllers/Comments");

const authMiddleware = require("../middlewares/auth");

router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", getCommentsByPostId);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
