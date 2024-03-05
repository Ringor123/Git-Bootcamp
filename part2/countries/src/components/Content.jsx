import Country from './Country'
import { useState, useEffect } from 'react'

const Content = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState()

    useEffect(() => {
        setSelectedCountry(null)
    }, [countries]);

    const handleCountryClick = country => {
        setSelectedCountry(country)
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if(countries.length === 1) {
        return (
            <div>
            {countries.map((country) =>
                <Country key={country.name.common} country={country} />
                )}
            </div>
        )
    } else if (countries.length < 10 && countries.length > 1 ) {
        return (
            <div>
                {selectedCountry ? (
                    <Country country={selectedCountry} />
                ) : (
                    <ul>
                        {countries.map((country) => (
                            <li key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => handleCountryClick(country)}>Show</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }
}



export default Content