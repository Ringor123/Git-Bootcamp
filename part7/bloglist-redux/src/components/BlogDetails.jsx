import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { Button, Col, Container, Row, Form, FormControl, FormGroup } from 'react-bootstrap'

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
    <Container>
      <Container>
        <h1>{blog.title}</h1>
      </Container>
      <Container>
        <Row>
          <Col>URL: <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></Col>
          <Col>Created by: {blog.author}</Col>
          <Col><p>{blog.likes} likes <Button size="sm" onClick={handleUpdate}>like</Button></p></Col>
        </Row>
      </Container>
      <Container className='d-grid gap-2'>
        {user && blog.user && blog.user.id === user.id && (
          <Button variant="outline-danger" onClick={handleDelete}>Delete blog</Button>
        )}

        <Form onSubmit={handleCommentSubmit}>
          <FormGroup>
            <FormControl type='text' value={comment} onChange={({ target }) => setComment(target.value)} placeholder='Write a comment...' />
          </FormGroup>
          <Button type='submit'>Comment</Button>
        </Form>

        <h3>comments</h3>
        <ul>
          {blog.comments.map((comment, index) => (<li key={index}>{comment}</li>
          ))}
        </ul>
      </Container>
    </Container>
  )
}

export default BlogDetails