
const Person = ({ id, name, number, deleteContact }) => {
	return (
		<>
			<p>
				{name} {number}
			</p>
			<button onClick={() => deleteContact(id)}>delete</button>
		</>
	);
};

export default Person;
