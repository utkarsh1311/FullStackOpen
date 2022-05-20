const Filter = ({ name, showResults }) => {
	return (
		<div>
			filter shown with
			<input
				value={name}
				onChange={showResults}
			/>
		</div>
	);
};

export default Filter;
