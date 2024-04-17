const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json and there are 3 blogs', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 3)
})

test('the unique identifier of blog list is the id property', async() => {
   const response = await api
   .get('/api/blogs')
   .expect(200)

   const blogs = response.body

   blogs.forEach(blog => {
    assert(blog.id)
    assert(!blog._id)
   })
})

test('a new blog can be added', async() => {
  const newBlog = {
    title: 'sdfsdf',
    author: 'sdfsdf',
    url: 'sdfsdf',
    likes: 12 
  }

   await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length +1)
    const titles = response.body.map(r => r.title)
    assert(titles.includes('sdfsdf'))
})

test('if likes property is missing, the value is 0', async () => {
  const newBlog = {
    title: 'sdfsdf',
    author: 'sdfsdf',
    url: 'sdfsdf'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  const blog = response.body.find(r => r.title === 'sdfsdf')
  assert.strictEqual(blog.likes, 0)
})

test('if url or tittle property is missing, the backend respond wieh 400 bad request code', async() => {
  const newBlog = {
    author: 'sdfsdf',
    likes: 12 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})