const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const api = supertest(app);
const helper = require("./helper");
const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
});

test("get correct amount of blogs", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blog has property id", async () => {
	const response = await helper.blogsInDB();
	expect(response[0].id).toBeDefined();
});

test("a new blog is created", async () => {
	let newBlog = {
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDB();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("likes property defaults to 0 is missing", async () => {
	let newBlog = {
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const updatedBlogs = await helper.blogsInDB();
	expect(updatedBlogs.at(-1).likes).toBe(0);
});

afterAll(() => {
	mongoose.connection.close();
});
