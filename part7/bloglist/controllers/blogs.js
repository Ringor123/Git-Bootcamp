const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  } else if (!token) {
    return response.status(401).json({ error: 'token missing'})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user.id,
    likes: body.likes || 0
  })

   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save()

   if (savedBlog) {
    response.status(201).json(savedBlog)
   } else {
    response.status(400).end()
   }
   
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = request.user

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  } else if (!token) {
    return response.status(401).json({ error: 'token missing'})
  }

  const blog = await Blog.findById(id)

  if (blog.user.toString() !== user.id) {
    return response.status(403).json({ error: 'permission denied' })
  }

  if (blog) {
    await blog.deleteOne()
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'blog not found'}).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  .populate('user', { username: 1, name: 1 })

  if (updateBlog) {
    response.json(updateBlog)
    response.status(200).end()
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter