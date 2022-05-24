import CompactCountryDisplay from "./CompactCountryDisplay";
import Country from "./Country";

const DisplayCountries = ({ countriesToShow }) => {
	// console.log(countriesToShow);
	if (countriesToShow.length >= 10) {
		return <p>Too many results</p>;
	} else if (countriesToShow.length !== 1) {
		return countriesToShow.map(country => (
			<CompactCountryDisplay key={country.area} country={country} />
		));
	}

	let country = countriesToShow[0];
	return <Country country={country} />;
};

export default DisplayCountries;
