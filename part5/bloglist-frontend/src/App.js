import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const initialState = {
		title: "",
		author: "",
		url: "",
	};

	const [blog, setBlog] = useState(initialState);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async event => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			setUser(user);
			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUsername("");
			setPassword("");
		} catch (e) {
			console.error("Invalid credentials");
		}

		console.log("loggin in with", username, password);
	};

	const handleLogout = () => {
		window.localStorage.clear();
		setUser(null);
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h2>Login to the application</h2>
			<label htmlFor="username">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				value={username}
				onChange={({ target }) => setUsername(target.value)}
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				value={password}
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button type="submit">Login</button>
		</form>
	);

	const handleChange = ({ target }) => {
		setBlog(prev => ({ ...prev, [target.id]: target.value }));
	};

	const addBlog = async e => {
		e.preventDefault();
    console.log({ ...blog, userId: user.id });
		const newBlog = await blogService.createBlog({ ...blog, userId: user.id });
		setBlogs(prevBlogs => prevBlogs.concat(newBlog));
		setBlog(initialState);
	};

	const blogForm = () => (
		<div>
			<h3>Create new blog</h3>
			<form onSubmit={addBlog}>
				<div>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						name="title"
						value={blog.title}
						onChange={e => handleChange(e)}
					/>
				</div>
				<div>
					<label htmlFor="author">Author</label>
					<input
						type="text"
						name="author"
						id="author"
						value={blog.author}
						onChange={e => handleChange(e)}
					/>
				</div>
				<div>
					<label htmlFor="url">Url</label>
					<input
						type="text"
						name="url"
						value={blog.url}
						id="url"
						onChange={e => handleChange(e)}
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);

	return (
		<div>
			{!user ? (
				loginForm()
			) : (
				<>
					<h2>Blogs</h2>
					<p>{user.name} is logged in</p>
					<button onClick={handleLogout}>logout</button>
					{blogForm()}
					{blogs.map(blog => (
						<Blog
							key={blog.id}
							blog={blog}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
