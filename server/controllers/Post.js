const { Post } = require("../models");
const { validationResult } = require("express-validator");

exports.getPost = (req, res, next) => {
	Post.findByPk(req.params.id).then((e) => res.status(200).json(e));
};

exports.getPosts = (req, res, next) => {
	Post.findAll()
		.then((things) => res.status(200).json(things))
		.catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const post = new Post({
		...req.body,
	});

	post
		.save()
		.then(() => res.status(201).json({ message: "Objet enregistré !" }))
		.catch((error) => {
			const message =
				error.message || "Une erreur est survenue lors de la création du post";
			res.status(400).json({ message });
		});
};

exports.updatePost = async (req, res) => {
	try {
		const updatedPost = await Post.update(
			{ ...req.body },
			{ where: { id: req.params.id } }
		);

		res.status(200).json({ message: "Post updated successfully", updatedPost });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

exports.deletePost = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedPost = await Post.destroy({
			where: { id },
		});

		res.status(200).json({ message: "Post deleted successfully", deletedPost });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
