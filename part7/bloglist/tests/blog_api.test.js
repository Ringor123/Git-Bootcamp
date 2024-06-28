const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseBlogs = blogObjects.map(blog => blog.save())
  await Promise.all(promiseBlogs)

  const newUser = {
    name:'test',
    username: 'test',
    password: 'test',
  }

  await api
  .post('/api/users')
  .send(newUser)

})


describe('Get blogs', () => {
  test('blogs are returned as json and there are 3 blogs', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, 3)
  })

  test('a new blog can be added', async() => {
    
    const newBlog = {
      title: 'sdfsdf',
      author: 'sdfsdf',
      url: 'sdfsdf',
      likes: 12 
    }

    const token = await helper.userLoginToken()
  
     await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length +1)
      const titles = response.body.map(r => r.title)
      assert(titles.includes('sdfsdf'))
  })

  test('fails with statuscode 404 if blog does not exist', async() => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('Blog properties', () => {
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

  test('if likes property is missing, the value is 0', async () => {

    const newBlog = {
      title: 'sdfsdf',
      author: 'sdfsdf',
      url: 'sdfsdf'
    }

    const token = await helper.userLoginToken()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(r => r.title === 'sdfsdf')
    assert.strictEqual(blog.likes, 0)
  })

  test('if url or title property is missing, the backend respond with 400 bad request code', async() => {
    const newBlog = {
      author: 'sdfsdf',
      likes: 12 
    }

    const token = await helper.userLoginToken()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async() => {
    const token = await helper.userLoginToken()

    const newBlog = {
      title: 'BLOG TO DELETE',
      author: 'Pablo',
      url: 'www.pablo.com'
    }

    const blogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

      const blogToDelete = blogResponse.body

      await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const token = await helper.userLoginToken()

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('update blog', () => {
  test('correctly update blog likes with status code 200', async() => {
    const token = await helper.userLoginToken()

    const newBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'BLOG TO UPDATE',
        author: 'Pablo',
        url: 'www.pablo.com',
        likes: 1
      })
      .expect(201)

    const blogId = newBlogResponse.body.id
    
    const updatedBlogResponse = await api
      .put(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        likes: 12
      })
      .expect(200)

    const updatedBlog = updatedBlogResponse.body

    assert.strictEqual(updatedBlog.likes, 12)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    const updatedBlog = {
      id: invalidId,
      likes: 12
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .expect(400)
  })
})

describe('Add new blog', () => {
  test('fails with statuscode 401 if token is missing', async () => {
    const newBlog = {
      title: 'sdfsdf',
      author: 'sdfsdf',
      url: 'sdfsdf',
      likes: 12 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})

