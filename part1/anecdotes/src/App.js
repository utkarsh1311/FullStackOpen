import { useState } from "react";

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ heading, anecdote, votes }) => {
	return (
		<div>
			<h1>{heading}</h1>
			<p>{anecdote}</p>
			<p>has {votes} votes</p>
		</div>
	);
};

const Winner = ({ anecdotes, votes }) => {
	let best = votes.indexOf(Math.max(...votes));
	return (
		<Anecdote
			heading="Anecdote with most votes"
			anecdote={anecdotes[best]}
			votes={votes[best]}
		/>
	);
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

	const updateVotes = () => {
		let newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);
	};

	const updateAnecdotes = () => {
		let newNumber = selected;
		do {
			newNumber = Math.floor(Math.random() * anecdotes.length);
		} while (newNumber === selected);

		setSelected(newNumber);
	};

	return (
		<div>
			<Anecdote
				heading="Anecdote of the day"
				anecdote={anecdotes[selected]}
				votes={votes[selected]}
			/>
			<Button onClick={updateVotes} text="vote" />
			<Button onClick={updateAnecdotes} text="next anecdote" />
			<Winner anecdotes={anecdotes} votes={votes} />
		</div>
	);
};

export default App;
