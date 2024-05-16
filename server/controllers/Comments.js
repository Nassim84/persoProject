const { Comment } = require("../models");

exports.createComment = async (req, res) => {
	try {
		const newComment = await Comment.create({
			content: req.body.content,
			postId: req.params.postId,
		});
		res.status(201).json(newComment);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.getCommentsByPostId = async (req, res) => {
	try {
		const comments = await Comment.findAll({
			where: { postId: req.params.postId },
		});
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.updateComment = async (req, res) => {
	try {
		const updatedComment = await Comment.update(
			{ content: req.body.content },
			{ where: { id: req.params.id } }
		);
		res.status(200).json({ message: "Comment updated successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

exports.deleteComment = async (req, res) => {
	try {
		await Comment.destroy({ where: { id: req.params.id } });
		res.status(200).json({ message: "Comment deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
