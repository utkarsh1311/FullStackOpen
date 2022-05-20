import { useState } from "react";

function App() {
	const [persons, setPersons] = useState([{}]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const addNewContact = (event) => {
		event.preventDefault();
		let newPerson = {
			name: newName,
			number: newNumber,
		};
		if (!persons.some((obj) => obj.name === newPerson.name)) {
			setPersons(persons.concat(newPerson));
			setNewName("");
			setNewNumber("");
		} else {
			alert(`${newPerson.name} already added to the phonebook`);
			setNewName("");
		}
	};

	const handleNewNumber = (event) => {
		console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const handleNewPerson = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNewContact}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={handleNewPerson}
					/>
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={handleNewNumber}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
}

export default App;
