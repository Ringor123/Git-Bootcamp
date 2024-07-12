import { useState } from 'react'
import PropTypes from 'prop-types'
import { InputGroup, Form, Button, Container, FormGroup, FormLabel, FormControl } from 'react-bootstrap'

const NewBlogForm = ({ addBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    await addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <Container>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit} className='newBlog-submit'>
        <FormGroup className='mb-3'>
          <FormLabel>Title: </FormLabel>
          <FormControl
            type="text"
            value={newTitle}
            placeholder="Enter title"
            onChange={({ target }) => setNewTitle(target.value)}
            className='newBlog-title'
          />
        </FormGroup>
        <FormGroup className='mb-3'>
          <FormLabel>Author: </FormLabel>
          <FormControl
            type="text"
            value={newAuthor}
            placeholder="Enter author"
            onChange={({ target }) => setNewAuthor(target.value)}
            className='newBlog-author'
          />
        </FormGroup>
        <FormGroup className='mb-3'>
          <FormLabel>Url: </FormLabel>
          <FormControl
            type="text"
            value={newUrl}
            placeholder="Enter URL"
            onChange={({ target }) => setNewUrl(target.value)}
            className='newBlog-url'
          />
        </FormGroup>
        <div className='d-grid'>
          <Button type="submit">Save blog</Button>
        </div>
      </Form>
    </Container>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm