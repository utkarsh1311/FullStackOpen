import Weather from "./Weather";

const Country = ({ country }) => {
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
			<Weather
				capital={country.capital}
				capitalInfo={country.capitalInfo}
			/>
		</>
	);
};

export default Country;
