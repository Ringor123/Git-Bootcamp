require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')


morgan.token('data', (request, response)  => { return JSON.stringify(request.body) })


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = []

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformated id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error => next(error))
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
  })

app.get('/info', (request, response) => {
    const date = new Date()

    Person.find({}).then(persons => {
    response.send(`
    <div>
        <p>Phonebook has info for ${persons.length} people</p>
    </div>
    <div>
        <p>${date}</p>
    </div>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    
    Person.findById(id)
      .then((person) => {
        if (person) {
          response.json(person)
        } else {
          response.status(204).end()
        }
      })
      .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const {name, number} = request.body

    Person.findByIdAndUpdate(
      id, {name, number},
       {new:true, runValidators: true, context: 'query'})
      .then((updatedPerson) => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    
    Person.findByIdAndDelete(id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({errror: 'content missing'})
    }
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    
    person.save().then(personSaved => {
      response.json(personSaved)
    })
    .catch(error => next(error))
  })

  app.use(unknownEndpoint)
  app.use(errorHandler)

  const PORT = process.env.PORT 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })