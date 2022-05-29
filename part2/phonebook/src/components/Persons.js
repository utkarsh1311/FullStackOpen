import Person from "./Person";

const Persons = ({ list, deleteContact }) => {
	return (
		<div>
			{list.map(person => (
				<Person
					key={person.id}
					id={person.id}
					name={person.name}
					number={person.number}
					deleteContact={deleteContact}
				/>
			))}
		</div>
	);
};

export default Persons;
