import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'

const BlogDetails = ({ updateBlog, deleteBlog, user }) => {
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)

  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return <div>Loading...</div>
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

    if (windowConfirm) {
      await deleteBlog(blog)
    }
  }

  const handleCommentSubmit = async event => {
    event.preventDefault()
    await dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <div>
        <h1>{blog.title}</h1>
      </div>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <p>{blog.likes} likes <button onClick={handleUpdate}>like</button><br />
          added by {blog.author}</p>
        {user && blog.user && blog.user.id === user.id && (
          <p><button onClick={handleDelete}>Delete blog</button></p>
        )}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input type='text' value={comment} onChange={({ target }) => setComment(target.value)} placeholder='Write a comment...' />
          <button>Comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails