import { useState } from "react";

function App() {
	const [persons, setPersons] = useState([]);

	let [listToShow, setListToShow] = useState(persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");

	const showSearchResults = (event) => {
		let filterName = event.target.value;
		console.log(filterName);
		setSearchName(filterName);
		let filteredPerson = persons.filter((person) =>
			person.name.toLowerCase().startsWith(filterName.toLowerCase())
		);
		setListToShow(filteredPerson);
	};

	const addNewContact = (event) => {
		event.preventDefault();
		let newPerson = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		if (!persons.some((obj) => obj.name === newPerson.name)) {
			setPersons(persons.concat(newPerson));
			setListToShow(listToShow.concat(newPerson));
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
			<div>
				filter shown with
				<input
					value={searchName}
					onChange={showSearchResults}
				/>
			</div>
			<h2>add a new</h2>

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
				{listToShow.map((person) => (
					<p key={person.id}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
}

export default App;
