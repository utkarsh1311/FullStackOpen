const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
	},
	author: {
		type: String,
		required: true,
		minlength: 5,
	},
	url: {
		type: String,
		required: true,
		minlength: 4,
	},
	likes: {
		type: Number,
		default: 0,
	},
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
