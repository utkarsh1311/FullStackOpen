import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personsService";

function App() {
	const [persons, setPersons] = useState([]);
	const [listToShow, setListToShow] = useState(persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");

	useEffect(() => {
		console.log("In use effect");
		personService.getAllPersons().then((returnedPerson) => {
			setPersons(returnedPerson);
			setListToShow(returnedPerson);
		});
	}, []);

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
		};

		if (persons.some((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newPerson.name} already added to the phonebook, replace the old number with the new one?`
				)
			) {
				let requiredPerson = persons.filter(
					(person) => person.name === newName
				);
				console.log(requiredPerson);
				let personId = requiredPerson[0].id;
				console.log(personId);
				personService
					.updateNumber(personId, newPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== personId ? person : returnedPerson
							)
						);
						setListToShow(
							listToShow.map((person) =>
								person.id !== personId ? person : returnedPerson
							)
						);
						setNewNumber("");
						setNewName("");
					});
			}
		} else {
			personService.addNewPerson(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setListToShow(listToShow.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
			});
		}
	};

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleNewPerson = (event) => {
		setNewName(event.target.value);
	};

	const deleteContact = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			let newList = persons.filter((person) => person.id !== id);
			personService.removePerson(id).then((response) => {
				setPersons(newList);
				setListToShow(newList);
			});
		}
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
			<Persons
				deleteContact={deleteContact}
				list={listToShow}
			/>
		</div>
	);
}

export default App;
