const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://ringor123:${password}@phonebookapp.2izzbfw.mongodb.net/?retryWrites=true&w=majority&appName=PhonebookApp`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})



if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
} else if (process.argv.length > 3 && process.argv.length < 5) {
  console.log("please provide all data")
  process.exit(1)
} else if (process.argv.length > 5) {
  console.log("you only have to provide name and number")
  process.exit(1)
}
