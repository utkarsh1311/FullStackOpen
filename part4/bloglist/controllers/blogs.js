const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res, next) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
	const blog = Blog.findById(req.params.id);
	res.status(200).json(blog);
});

blogsRouter.post("/", userExtractor, async (req, res) => {
	const { title, author, url, likes, userId } = req.body;

	const user = req.user;

	if (!title || !author || !url) {
		return res.status(400).json({
			error: "missing relevant information",
		});
	}

	if (title.length < 4) {
		return res.status(400).json({
			error: "title must be at least 4 characters long",
		});
	}

	if (author.length < 2) {
		return res.status(400).json({
			error: "author must be at least 3 characters long",
		});
	}

	const newBlog = new Blog({
		title,
		author,
		url,
		likes,
		user: user._id,
	});

	const result = await newBlog.save();

	user.blogs = user.blogs.concat(result._id);

	await user.save();

	res.status(201).json(result);
});

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);

	if (!blog) {
		return res.status(404).json({
			error: "blog doesn't exist",
		});
	}

	const user = req.user;

	if (!(blog.user._id.toString() === user._id.toString())) {
		res.status(401).json({
			error: "Unauthorized request",
		});
	}
	await Blog.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
	const body = req.body;
	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
		new: true,
	});
	res.json(updatedBlog).status(204);
});

module.exports = blogsRouter;
