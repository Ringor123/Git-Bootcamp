import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = (props) => {

  const [persons, setPersons] = useState(props.numbers) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  const personName = persons.map((person) => person.name)
  const personNumber = persons.map((person) => person.number)


const addName = (event) => {
  event.preventDefault()

  const nameObject = {
    name: newName,
    number: newNumber,
    id: persons.length + 1,
  }
  if (newName === '' || newNumber === '') {
    alert('Please complete all the fields')
  } else if (personName.includes(newName)) {
    alert(`The name ${newName} is already added to the phonebook`)
  } else if (personNumber.includes(newNumber)) {
    alert(`The number ${newNumber} is already added to the phonebook`)
  } else  {
    setPersons(persons.concat(nameObject))
  }

  setNewName('')
  setNewNumber('')

}

const handleNameChange = (event) => {
  //console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  //console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilterChange = (event) => {
  //console.log(event.target.value)
  setFiltered(event.target.value)
}
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filtered} onChange={handleFilterChange}/>
        <h2>Add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} onNumberChange={handleNumberChange} onNameChange={handleNameChange}/>
        <h2>Numbers</h2>
        {persons.filter((person) => person.name.toLowerCase().includes(filtered.toLowerCase())).map((person) =>
            <table key={person.id}>
              <tbody>
                <Person key={person.id} person={person}/>
            </tbody>
            </table>
        )} 
    </div>
  )
}

export default App
