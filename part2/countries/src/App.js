import axios from "axios";
import { useEffect, useState } from "react";
import DisplayCountries from "./components/DisplayCountries";

function App() {
	const [allCountries, setAllCountries] = useState([]);
	const [searchCountries, setSearchCountries] = useState("");
	const [queriedCountries, setQueriedCountries] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then(response => {
			setAllCountries(response.data);
			// console.log(response.data[0]);
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
				<label htmlFor="country-search">find countries</label>
				<input
					id="country-search"
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
