const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { username, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await Users.create({
			username,
			password: hashedPassword,
		});

		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

exports.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { username, password } = req.body;

		const user = await Users.findOne({
			where: {
				username,
			},
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid username or password" });
		}

		const token = jwt.sign({ userId: user.id }, "SECRET_KEY", {
			expiresIn: "1h",
		});

		res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};
