import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";



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
			<Filter
				name={searchName}
				showResults={showSearchResults}
			/>
			<h2>add a new</h2>
			<PersonForm
				addNewContact={addNewContact}
				name={newName}
				handleNewName={handleNewPerson}
				number={newNumber}
				handleNewNumber={handleNewNumber}
			/>
			<h2>Numbers</h2>
			<Persons list={listToShow} />
		</div>
	);
}

export default App;
