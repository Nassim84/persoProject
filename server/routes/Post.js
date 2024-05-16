const express = require("express");
const post = require("../controllers/Post");
const { body } = require("express-validator");
const router = express.Router();

router.get("/:id", post.getPost);
router.get("/", post.getPosts);
router.post(
	"/",
	[
		body("title").notEmpty().withMessage("Le titre est requis"),
		body("postText").notEmpty().withMessage("Le texte du post est requis"),
		body("username").notEmpty().withMessage("Le nom d'utilisateur est requis"),
	],
	post.createPost
);
router.put("/:id", post.updatePost);
router.delete("/:id", post.deletePost);

module.exports = router;
