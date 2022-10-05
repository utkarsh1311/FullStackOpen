const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
	const users = await User.find({}).populate("blogs", {
		title: 1,
		author: 1,
		url: 1,
	});
	res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
	const { username, name, password } = req.body;

	const exisitingUser = await User.findOne({ username });
	if (exisitingUser) {
		return res.status(400).json({
			error: "username must be unique",
		});
	}

	if (!username || !password) {
		return res.status(400).json({
			error: "username or password is missing",
		});
	}

	if (username.length < 3) {
		return res.status(400).json({
			error: "username must be at least 3 characters long",
		});
	}

	if (password.length < 6) {
		return res.status(400).json({
			error: "password should be at least 6 characters long",
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({ username, name, passwordHash });

	const savedUser = await user.save();
	res.status(201).json(savedUser);
});

module.exports = usersRouter;
