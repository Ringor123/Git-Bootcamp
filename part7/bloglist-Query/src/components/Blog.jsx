import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    alignItems:'center',
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1,
    })
    await updateBlog(updatedBlog)
  }

  const handleDelete = async () => {
    const windowConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if(windowConfirm) {
      await deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <p>
        <b>Title: </b><span className='blog-title'>{blog.title}</span>&ensp;
        <b>Author: </b><span className='blog-author'>{blog.author}</span>&ensp;
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </p>
      {visible && (
        <div>
          <b>Url: </b><span className='blog-url'>{blog.url}</span><br />
          <b>Likes: </b><span className='blog-likes'>{blog.likes}</span>&ensp;<button onClick={handleUpdate}>like</button>
          {user && blog.user && blog.user.id === user.id && (
            <p><button onClick={handleDelete}>Delete blog</button></p>
          )}
        </div>
      )}
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog