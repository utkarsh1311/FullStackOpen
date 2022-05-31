import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personsService";

function App() {
	const [persons, setPersons] = useState([]);
	const [listToShow, setListToShow] = useState(persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");
	const [messageDetails, setMessageDetails] = useState({});

	useEffect(() => {
		console.log("In use effect");
		personService.getAllPersons().then(returnedPerson => {
			setPersons(returnedPerson);
			setListToShow(returnedPerson);
		});
	}, []);

	const showSearchResults = event => {
		let filterName = event.target.value;
		setSearchName(filterName);
		let filteredPerson = persons.filter(person =>
			person.name.toLowerCase().startsWith(filterName.toLowerCase())
		);
		setListToShow(filteredPerson);
	};

	const resetDetails = () => {
		setNewName("");
		setNewNumber("");
	};

	const resetNotification = () => {
		setTimeout(() => {
			setMessageDetails({});
		}, 5000);
	};
	const addNewContact = event => {
		event.preventDefault();
		let newPerson = {
			name: newName,
			number: newNumber,
		};

		if (persons.some(person => person.name === newName)) {
			if (
				window.confirm(
					`${newPerson.name} already added to the phonebook, replace the old number with the new one?`
				)
			) {
				let requiredPerson = persons.filter(person => person.name === newName);
				let personId = requiredPerson[0].id;
				personService
					.updateNumber(personId, newPerson)
					.then(returnedPerson => {
						setPersons(
							persons.map(person =>
								person.id !== personId ? person : returnedPerson
							)
						);
						setListToShow(
							listToShow.map(person =>
								person.id !== personId ? person : returnedPerson
							)
						);
						setMessageDetails({
							message: `Updated ${returnedPerson.name}'s number`,
							type: "success",
						});
						resetNotification();
						resetDetails();
					})
					.catch(errorMessage => {
						console.log(errorMessage);
						setMessageDetails({
							messageDetails: `Couldn't update the number`,
							type: `failure`,
						});
						resetNotification();
					});
			}
		} else {
			personService
				.addNewPerson(newPerson)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson));
					setListToShow(listToShow.concat(returnedPerson));
					setMessageDetails({
						message: `Added ${returnedPerson.name}`,
						type: "success",
					});
					resetDetails();
					resetNotification();
				})
				.catch(errorMessage => {
					console.log(errorMessage);
					setMessageDetails({
						messageDetails: `Couldn't add the new person details`,
						type: `failure`,
					});
					resetNotification();
				});
		}
	};

	const handleNewNumber = event => {
		setNewNumber(event.target.value);
	};

	const handleNewPerson = event => {
		setNewName(event.target.value);
	};

	const deleteContact = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			let newList = persons.filter(person => person.id !== id);
			personService
				.removePerson(id)
				.then(response => {
					setPersons(newList);
					setListToShow(newList);
					setMessageDetails({
						message: `Successfully deleted ${name}`,
						type: "success",
					});
					resetNotification();
				})
				.catch(errorMessage => {
					console.log(errorMessage);
					setMessageDetails({
						message: `Information of ${name} has already been removed from the server.`,
						type: `failure`,
					});
					resetNotification();
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				message={messageDetails.message}
				type={messageDetails.type}
			/>
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
