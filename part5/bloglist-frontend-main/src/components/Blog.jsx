import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    console.log(blog.user)
    console.log(blog.user.id)
    console.log(user.id)
    console.log('Logged-in user ID:', user.id)
    console.log('Blog user ID:', blog.user ? blog.user.id : 'undefined')
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
        <b>Title: </b>{blog.title}&ensp;
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </p>
      {visible && (
        <div>
          <b>Author: </b>{blog.author}<br></br>
          <b>Url: </b>{blog.url}<br></br>
          <b>Likes: </b>{blog.likes}&ensp;<button onClick={handleUpdate}>like</button>
          {blog.user && blog.user.id === user.id && (
            <p><button onClick={handleDelete}>Delete blog</button></p>
          )}
        </div>
      )}
    </div>

  )
}

export default Blog