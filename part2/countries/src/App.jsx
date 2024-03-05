import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Content from './components/Content'


const App = () => {
  const [allCountries, setAllCountries] = useState()
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')

  

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  if (!allCountries) {
    return <p>Loading countries...</p>
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFiltered(filterValue);

    if (!filterValue) {
      setCountries([]);
    } else {
      const regex = new RegExp(filterValue, 'i');
      const filteredCountries = allCountries.filter(country => country.name.common.match(regex));
      setCountries(filteredCountries);
    }
  };

  return (
    <div>
      <div>
        <Filter onChange={handleFilterChange} value={filtered}  />
      </div>
      <div>
      <Content countries={countries} />
      </div>
    </div>
  )
}

export default App
