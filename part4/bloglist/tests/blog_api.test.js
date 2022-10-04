const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const api = supertest(app);
const helper = require("./helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("test for blogs", () => {
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
		expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1);
	});

	test("get 400 error is blog title or url is missing", async () => {
		let newBlog = {
			author: "Robert C. Martin",
			likes: 10,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDB();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});

	test("a blog can be deleted", async () => {
		const blogsAtStart = await helper.blogsInDB();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
		const blogsAtEnd = await helper.blogsInDB();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const remainingBlogs = blogsAtEnd.map(b => b.id);
		expect(remainingBlogs).not.toContain(blogToDelete.id);
	});

	test("blog with valid id can be updated", async () => {
		let newBlog = {
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
			likes: 10,
		};

		const blogsAtStart = await helper.blogsInDB();
		const blogToUpdate = blogsAtStart[0];

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDB();
		expect(blogsAtEnd[0]).toEqual({ ...newBlog, id: blogToUpdate.id });

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	}, 50000);
});

describe("tests for users", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash("tatakae", 10);
		const user = new User({
			username: "eren",
			name: "Eren Yeager",
			passwordHash,
		});

		await user.save();
	});

	test("user creation with valid credentials is successful", async () => {
		const newUser = {
			username: "levi",
			name: "Levi Ackermann",
			password: "give up and die",
		};
		const usersAtStart = await helper.usersInDB();
		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("user creation with invalid username fails", async () => {
		const newUser = {
			username: "He",
			name: "Naruto",
			password: "dattebayo",
		};
		const usersAtStart = await helper.usersInDB();
		await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).not.toContain(newUser.username);
	});

	test("user creation with invalid password fails", async () => {
		const newUser = {
			username: "goku",
			name: "Son Goku",
			password: "ka",
		};
		const usersAtStart = await helper.usersInDB();
		await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).not.toContain(newUser.username);
	});
});
afterAll(() => {
	mongoose.connection.close();
});
