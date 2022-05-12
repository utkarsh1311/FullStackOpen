import { useState } from "react";

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const Title = ({ text }) => {
	return <h1>{text}</h1>;
};

const StatisticLine = ({ text, value }) => {
	return (
		<p>
			{text} {value}
		</p>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	if (good === 0 && neutral === 0 && bad === 0) {
		return <p>no feedback given</p>;
	}

	let totalFeedback = good + neutral + bad;
	let average = 0;
	if (good !== 0) {
		average = (good - bad) / totalFeedback;
	}
	let positiveFeedback = 0;
	if (good !== 0) {
		positiveFeedback = (good / totalFeedback) * 100;
	}

	return (
		<div>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="average" value={average} />
			<StatisticLine text="positive" value={positiveFeedback} />
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
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
