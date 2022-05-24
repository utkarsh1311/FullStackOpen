import { useEffect, useState } from "react";
import axios from "axios";

const CompactCountryDisplay = ({ country }) => {
	const [show, setShow] = useState(false);

	if (!show) {
		return (
			<div>
				{country.name.official}
				{""}
				<button onClick={() => setShow(true)}>show</button>
			</div>
		);
	}
	return <CountryCard country={country} />;
};

const CountryCard = ({ country }) => {
	return (
		<>
			<h1>{country.name.official}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h3>languages: </h3>
			<ul>
				{Object.values(country.languages).map(lang => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`${country.name.official} flag`}
			/>
		</>
	);
};

const DisplayCountries = ({ countriesToShow }) => {
	console.log(countriesToShow);
	if (countriesToShow.length >= 10) {
		return <p>Too many results</p>;
	} else if (countriesToShow.length !== 1) {
		return countriesToShow.map(country => (
			<CompactCountryDisplay key={country.area} country={country} />
		));
	}

	let country = countriesToShow[0];
	return <CountryCard country={country} />;
};

function App() {
	const [allCountries, setAllCountries] = useState([]);
	const [searchCountries, setSearchCountries] = useState("");
	const [queriedCountries, setQueriedCountries] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then(response => {
			setAllCountries(response.data);
			console.log(response.data[0]);
		});
	}, []);

	const handleCountrySearch = event => {
		setSearchCountries(event.target.value);
		let query = event.target.value.toLowerCase();
		let filteredCountries = allCountries.filter(country =>
			country.name.official.toLowerCase().includes(query)
		);
		setQueriedCountries(filteredCountries);
	};

	return (
		<div>
			<form onSubmit={e => e.preventDefault()}>
				find countries
				<input
					type="text"
					value={searchCountries}
					onChange={handleCountrySearch}
				/>
			</form>
			<DisplayCountries countriesToShow={queriedCountries} />
		</div>
	);
}

export default App;
