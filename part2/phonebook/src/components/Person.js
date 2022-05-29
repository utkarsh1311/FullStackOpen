const Person = ({ id, name, number, deleteContact }) => {
	return (
		<>
			<div>
				{name} {number}
				<button onClick={() => deleteContact(id, name)}>delete</button>
			</div>
		</>
	);
};

export default Person;
