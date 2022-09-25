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
	{
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
	},
	{
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObjects = blogs.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
}, 100000);

test("get correct amount of blogs", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(5);
}, 100000);

afterAll(() => {
	mongoose.connection.close();
});
