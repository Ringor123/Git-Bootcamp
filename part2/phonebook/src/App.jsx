import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/personServices'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const personName = persons.map((person) => person.name)
  const personNumber = persons.map((person) => person.number)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons.data)
    })
  }, [])

const addName = (event) => {
  event.preventDefault()

  const nameObject = {
    name: newName,
    number: newNumber,
  }

    if (personName.includes(newName) && newNumber !== '') {
      
      const oldNumber = persons.find((person) => person.name === newName).number

      if (confirm(nameObject.name + ' is already added to the phonebook, replace the old number (' + oldNumber + ') with a new one?')) {
        
        const personUpdate = persons.find(update => update.name === newName)
        //console.log(personUpdate)
        
        personService
        .update(personUpdate.id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personUpdate.id ? person : returnedPerson))
          setIsError(false)
          setErrorMessage(`Information of ${newName} udpdated`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error);
          setIsError(true)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
          
        
      }
    } else if (newName === '' || newNumber === '') {
      setIsError(true)
      setErrorMessage('Please complete all the fields')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
     else if (personNumber.includes(newNumber)) {
      const nameNumberRepeat = (persons.find(person => person.number === newNumber)).name
      //console.log(numberRepeat)
      setIsError(true)
      setErrorMessage(`The number ${newNumber} is already added to the phonebook with the name ${nameNumberRepeat}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      personService
      .create(nameObject)
      .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson.data))
      setIsError(false)
      setErrorMessage('Added ' + nameObject.name)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
      .catch(error => {
        setIsError(true)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
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

const handleDeleteClickOf = (id) => {
  const personToDelete = persons.find(n => n.id === id)
  //console.log(personToDelete.id)

  if (confirm('Delete ' + personToDelete.name + '?')) {
  personService
  .remove(personToDelete.id)
  .then(() => {
    setPersons(persons.filter(n => n.id !== id))
    setIsError(false)
    setErrorMessage('Deleted ' + personToDelete.name)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })


  }
}


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} error={isError}/>
      <Filter value={filtered} onChange={handleFilterChange}/>
        <h2>Add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} onNumberChange={handleNumberChange} onNameChange={handleNameChange}/>
        <h2>Numbers</h2>
        {persons.filter((person) => person.name.toLowerCase().includes(filtered.toLowerCase())).map((person) =>
            <table key={person.id}>
              <tbody>
                <Person key={person.id} person={person} handleDeleteClick={() => handleDeleteClickOf(person.id)}/>
            </tbody>
            </table>
        )} 
    </div>
  )
}

export default App
