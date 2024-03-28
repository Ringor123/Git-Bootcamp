import axios from "axios"
import { useState, useEffect } from "react"

const Country = ({country}) => {
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    const api_key = import.meta.env.VITE_SOME_KEY

    const [weather, setWeather] = useState()

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
            .then(response => {
            setWeather(response.data)
            })
        }, [country])

    if (!weather) {
        return <p>Loading weather...</p>
        }

    return (
        <div>
            <h2>{country.name.common}</h2>
                <table>
                <tbody>
                    <tr>
                        <td><strong>Capital: </strong> {country.capital}</td>
                    </tr>
                    <tr>
                        <td><strong>Area: </strong>{country.area}</td>
                    </tr>
                </tbody>
                </table>
                <p><strong>Languages: </strong></p>
                <ul>
                {Object.keys(country.languages).map(languageKey => (
                    <li key={languageKey}>{country.languages[languageKey]}</li>
                ))}          
                </ul>
                    <img src={country.flags.png} alt={country.flags.alt}   />
                    <h3>{"Weather in " + weather.name}</h3>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p><strong>{weather.weather[0].main}</strong></p>
                    <p><strong>Temperature: </strong>{(weather.main.temp - 273,15) + "º Celsius"}</p>
                    <p><strong>Wind: </strong>{weather.wind.speed + " m/s"}</p>
        </div>
    )
}

export default Country