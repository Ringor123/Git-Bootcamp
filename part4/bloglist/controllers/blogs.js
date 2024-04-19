const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
   const blog = new Blog(request.body)

   if (blog.likes === undefined) {
      blog.likes = 0
   }

   const savedBlog = await blog.save()
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
  const blog = await Blog.findById(id)

  if (blog) {
    await blog.deleteOne()
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  if (updateBlog) {
    response.json(updateBlog)
    response.status(200).end()
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter