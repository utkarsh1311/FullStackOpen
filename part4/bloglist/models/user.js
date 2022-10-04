const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
	},
	name: {
		type: String,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
