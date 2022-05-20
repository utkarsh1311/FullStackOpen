import Person from "./Person";

const Persons = ({ list }) => {
	return (
		<div>
			{list.map((person) => (
				<Person
					id={person.id}
					name={person.name}
					number={person.number}
				/>
			))}
		</div>
	);
};

export default Persons;
