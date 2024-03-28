const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('data', (request, response)  => { return JSON.stringify(request.body) })


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    const date = new Date()
    const totalPersons = persons.length

    console.log(totalPersons)
    console.log(date.toUTCString())

    response.send(`
    <div>
        <p>Phonebook has info for ${totalPersons} people</p>
    </div>
    <div>
        <p>${date}</p>
    </div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)  
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body
    const person = persons.find(person => person.id === id) 

    person.name = body.name
    person.number = body.number

    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    persons = persons.filter(person => person.id !== id)
  
    response.json(persons)
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    const personsName = persons.map(person => person.name)
    const personsNumber = persons.map(person => person.number)

  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else if (personsName.find(name => name === body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    } else if (personsNumber.find(number => number === body.number)) {
      return response.status(400).json({ 
        error: 'number must be unique' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const generateId = () => {
    const id = Math.random() * 100000
    return Math.round(id)
  }

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })