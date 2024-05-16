const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/Users");

router.post(
	"/login",
	[
		body("username").notEmpty().withMessage("Le nom d'utilisateur est requis"),
		body("password").notEmpty().withMessage("Le mot de passe est requis"),
	],
	userController.login
);

router.post(
	"/register",
	[
		body("username")
			.notEmpty()
			.withMessage("Le nom d'utilisateur est requis")
			.isLength({ min: 3 })
			.withMessage("Le nom d'utilisateur doit avoir au moins 3 caractères"),
		body("password")
			.notEmpty()
			.withMessage("Le mot de passe est requis")
			.isLength({ min: 6 })
			.withMessage("Le mot de passe doit avoir au moins 6 caractères"),
	],
	userController.register
);

module.exports = router;
