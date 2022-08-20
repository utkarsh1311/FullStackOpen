const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log(
		"Please provide the password as an argument: node mongo.js password"
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.jdsphjo.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

const addPerson = (name, number) => {
	const person = new Person({ name, number });
	person.save();
	console.log("Contact saved succesfully");
};

const displayPersons = persons => {
	console.log("phonebook:");
	persons.forEach(person => console.log(person.name, person.number));
};

mongoose
	.connect(url)
	.then(() => {
		if (process.argv.length == 5) {
			let personName = process.argv[3];
			let personNumber = process.argv[4];

			addPerson(personName, personNumber);
			mongoose.connection.close();
		} else if (process.argv.length == 3) {
			Person.find({}).then(persons => {
				displayPersons(persons);
				mongoose.connection.close();
			});
		}
	})
	.catch(err => console.log(err));
