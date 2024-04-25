const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // console.log('Token recibido', request.token)
  const body = request.body
  const token = request.token
  const user = request.user
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  } else if (!token) {
    return response.status(401).json({ error: 'token missing'})
  }

  // const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user.id
  })

   if (blog.likes === undefined) {
      blog.likes = 0
   }

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