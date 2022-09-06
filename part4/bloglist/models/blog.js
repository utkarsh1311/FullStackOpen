const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to", url);

mongoose
	.connect(url)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch(e => console.log("Error connecting to MongoDB: ", e.message));

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
