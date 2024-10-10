import { useMutation } from "@apollo/client"
import { useState } from "react"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const AuthorBirthyearForm = ({setNotify}) => {

  const INITIAL_STATE = {
    name: "",
    born: ""
  }

  const [changeBornYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMessage = error.graphQLErrors?.[0]?.message || "An unexpected error occurred";
      setNotify(errorMessage)
    }
  })


  const [inputValues, setInputValues] = useState(INITIAL_STATE)

  const handleChange = (event) => {
    event.preventDefault()

    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    }) 
  }


  console.log(inputValues)

  const handleSubmit = (event) => {
    event.preventDefault()

    changeBornYear({variables: {name: inputValues.name.trim(), setBornTo: Number(inputValues.born)}})

    setInputValues(INITIAL_STATE)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <label>Name: <input onChange={handleChange} type="text" name="name" value={inputValues.name}></input></label>
        <label>Birth Year: <input onChange={handleChange} type="number" name="born" value={inputValues.born}></input></label>
        <button style={{width: "200px"}} type="submit">Update Author Birthyear</button>
      </form>
    </div>
  )
}

export default AuthorBirthyearForm