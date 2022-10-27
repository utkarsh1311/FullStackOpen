import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
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
		}
	}, []);

	const handleLogin = async event => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			setUser(user);
			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
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

	return (
		<div>
			{!user ? (
				loginForm()
			) : (
				<>
					<h2>Blogs</h2>
					<p>{user.name} is logged in</p>
					<button onClick={handleLogout}>logout</button>
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
