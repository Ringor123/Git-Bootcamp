import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateNew = ({ anecdotes, setAnecdotes, setNotification }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content,
      author,
      info,
      votes: 0,
      id: Math.round(Math.random() * 10000)
    }
    setContent('')
    setAuthor('')
    setInfo('')
    setAnecdotes(anecdotes.concat(newAnecdote))
    setNotification(`a new anecdote ${newAnecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
  }

  const navigate = useNavigate()

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}