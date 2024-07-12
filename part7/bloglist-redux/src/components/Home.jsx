import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { Table } from 'react-bootstrap'

const Home = ({ blogs, addBlog, updateBlog, deleteBlog, user, blogFormRef }) => {
  return (
    <div>
      {user && (
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <NewBlogForm addBlog={addBlog} />
        </Togglable>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Blog title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Home
