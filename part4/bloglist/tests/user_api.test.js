const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name:'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

describe('User Validators', () => {
  test('if username is already exist, throw a error', async () => {
    const usersAtStart = await helper.usersInDb()
    const usernameRepeat = usersAtStart[0]

    const userRepeat = {
      username: usernameRepeat.username,
      password: "sdgdfg"
    }

    await api
      .post('/api/users')
      .send(userRepeat)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('if username is minus of 3 characters, throw a error', async () => {
    const usersAtStart = await helper.usersInDb()

    const usernameWrong = "as"

    const userWrong = {
      username: usernameWrong,
      password: "sdgdfg"
    }

    await api
      .post('/api/users')
      .send(userWrong)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('if username is missing, throw a error', async () => {
    const usersAtStart = await helper.usersInDb()

    const userWrong = {
      password: "sdgdfg"
    }

    await api
      .post('/api/users')
      .send(userWrong)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('if password is minus of 3 characters, throw a error', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const userWrong = {
      username: "qweqweqweqweqweqweqweqweqweqeqwsgdfg",
      password: "1"
    }

    await api
      .post('/api/users')
      .send(userWrong)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
