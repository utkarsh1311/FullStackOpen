const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
	.connect(url)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch(error => {
		console.err("Error connecting to the MongoDB: ", error.message);
	});
// let isnum = /^\d+$/.test(val);
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 8,
		validate: function (val) {
			if (/[a-zA-Z]/g.test(val)) return false;
			return true;
		},
		required: true,
	},
});

personSchema.set("toJSON", {
	transform: (document, returnedPerson) => {
		returnedPerson.id = returnedPerson._id.toString();
		delete returnedPerson._id;
		delete returnedPerson.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
