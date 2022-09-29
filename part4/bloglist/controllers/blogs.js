const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});

blogsRouter.get("/:id", (req, res) => {
	Blog.findById(req.params.id)
		.then(result => res.json(result))
		.catch(error => next(error));
});

blogsRouter.post("/", async (req, res) => {
	const newBlog = new Blog(req.body);

	const result = await newBlog.save();
	res.status(201).json(result);
});

module.exports = blogsRouter;
