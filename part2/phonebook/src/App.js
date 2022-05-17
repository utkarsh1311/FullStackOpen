import { useState } from "react";

function App() {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addNewPerson = (event) => {
		event.preventDefault();
		let newPerson = {
			name: newName,
		};
		if (!persons.some(obj => obj.name === newPerson.name)) {
			setPersons(persons.concat(newPerson));
			setNewName("");
		} else {
			alert(`${newPerson.name} already added to the phonebook`);
			setNewName("");
		}
	};

	const handleNewPerson = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNewPerson}>
				<div>
					name:{" "}
					<input
						value={newName}
						onChange={handleNewPerson}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((person) => (
					<p key={person.name}>{person.name}</p>
				))}
			</div>
		</div>
	);
}

export default App;
