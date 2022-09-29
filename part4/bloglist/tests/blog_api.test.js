const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const api = supertest(app);

const Blog = require("../models/blog");

const blogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
	},
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjects = blogs.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
});

test("get correct amount of blogs", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(3);
});

test("blog has property id", async () => {
	const response = await Blog.find({});
	expect(response[0]._id).toBeDefined();
});
afterAll(() => {
	mongoose.connection.close();
});
