import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

const Home = ({ blogs, addBlog, updateBlog, deleteBlog, user, blogFormRef }) => {
  return (
    <div>
      {user && (
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <NewBlogForm addBlog={addBlog} />
        </Togglable>
      )}
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        </Link>
      ))}
    </div>
  )
}

export default Home
