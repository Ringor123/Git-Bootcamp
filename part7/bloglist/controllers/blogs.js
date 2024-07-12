const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const { token } = request;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  } if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user,
    likes: body.likes || 0,
    comments: body.comments,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  if (savedBlog) {
    response.status(201).json(savedBlog);
  } else {
    response.status(400).end();
  }
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  // const { user } = request;
  const user = await User.findById(decodedToken.id);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  } if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  const blog = await Blog.findById(id);

  if (blog.user.toString() !== user.id) {
    return response.status(403).json({ error: 'permission denied' });
  }

  // if (blog) {
  //   await blog.deleteOne();
  //   response.status(204).end();
  // } else {
  //   response.status(404).json({ error: 'blog not found' }).end();
  // }
  await Blog.findByIdAndDelete(id);

  user.blogs = user.blogs.filter((blogId) => blogId.toString() !== id);
  await user.save();

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    .populate('user', { username: 1, name: 1 });

  if (updateBlog) {
    response.json(updateBlog);
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params;
  const { comment } = request.body;
  
  if (!comment) {
    return response.status(400).json({ error: 'Comment missing' });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  blog.comments = blog.comments.concat(comment);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
