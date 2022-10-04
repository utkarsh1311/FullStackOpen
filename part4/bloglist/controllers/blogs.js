const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res, next) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
	const blog = Blog.findById(req.params.id);
	res.status(200).json(blog);
});

blogsRouter.post("/", async (req, res, next) => {
	const newBlog = new Blog(req.body);

	const result = await newBlog.save();
	res.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res, next) => {
	await Blog.findByIdAndRemove(req.params.id);
	res.status(204);
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
