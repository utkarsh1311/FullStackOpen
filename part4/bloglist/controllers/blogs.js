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

blogsRouter.post("/", (req, res) => {
	const newBlog = new Blog(req.body);

	newBlog
		.save()
		.then(result => {
			res.status(201).json(result);
		})
		.catch(error => next(error));
});

module.exports = blogsRouter;
