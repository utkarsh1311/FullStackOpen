import { useState } from "react";

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const Title = ({ text }) => {
	return <h1>{text}</h1>;
};

const Results = ({ good, neutral, bad }) => {
	return (
		<div>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<Title text="give feedback" />
			<Button onClick={() => setGood(good + 1)} text="good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setBad(bad + 1)} text="bad" />
			<Title text="statistics" />
			<Results good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
