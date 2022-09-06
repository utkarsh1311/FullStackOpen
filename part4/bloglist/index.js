require("dotenv").config();
const express = require("express");
const Blog = require("./models/blog");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello world");
});

app.get("/api/blogs", (req, res) => {
	Blog.find({}).then(blogs => res.json(blogs));
});

app.get("/api/blogs/:id", (req, res) => {
	Blog.findById(req.params.id).then(result => {
		res.json(result);
	});
});

app.post("/api/blogs", (req, res) => {
	const blog = new Blog(req.body);

	blog.save().then(result => {
		res.status(201).json(result);
	});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
