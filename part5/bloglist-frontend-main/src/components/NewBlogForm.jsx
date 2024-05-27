import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ addBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url:newUrl
    }
    await addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} className='newBlog-submit'>
        <div>
          Title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
            className='newBlog-title'
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
            className='newBlog-author'
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
            className='newBlog-url'
          />
        </div>
        <button type="submit">Save blog</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm