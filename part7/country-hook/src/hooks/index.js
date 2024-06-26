import axios from "axios"
import { useEffect, useState } from "react"

export const useCountry = (name) => {
  const [country, setCountry] = useState({data: null, found: false})

  useEffect(() => {
    if (!name) return

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        console.log(response.data)
        setCountry({data: response.data, found:true})
      } catch (error) {
        setCountry({data: null, found: false})
      }
    }
    fetchCountry()
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
