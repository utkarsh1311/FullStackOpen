import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
	let allPersons = axios.get(baseUrl);
	return allPersons.then((response) => response.data);
};

const addNewPerson = (person) => {
	let newPerson = axios.post(baseUrl, person);
	return newPerson.then((response) => response.data);
};

const removePerson = (id) => {
	let removedPerson = axios.delete(`${baseUrl}/${id}`);
	return removedPerson;
};

export default { getAllPersons, addNewPerson, removePerson };