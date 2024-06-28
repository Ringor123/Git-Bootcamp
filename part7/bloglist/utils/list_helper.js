const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length +1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => {
    return (max.likes > blog.likes) ? max : blog
  })
}

const mostBlogs = (blogs) => {
  const blogCountByAuthor = _.countBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(_.keys(blogCountByAuthor), author => blogCountByAuthor[author])

  const result = {
    author: authorWithMostBlogs,
    blogs: blogCountByAuthor[authorWithMostBlogs]
  }
  return result
}

const mostLikes = (blogs) => {
  
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const likesByAuthor = _.mapValues(blogsByAuthor, authorBlogs => _.sumBy(authorBlogs, 'likes'))
  const authorWithMostLikes = _.maxBy(_.keys(likesByAuthor), author => likesByAuthor[author])

  const result = {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes]
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog, 
  mostBlogs,
  mostLikes
}