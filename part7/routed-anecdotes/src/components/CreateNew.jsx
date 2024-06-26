import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

export const CreateNew = ({ anecdotes, setAnecdotes, setNotification }) => {

  const navigate = useNavigate()

  const contentField = useField('content')
  const authorField = useField('author')
  const infoField = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
      id: Math.round(Math.random() * 10000)
    }
    setAnecdotes(anecdotes.concat(newAnecdote))
    setNotification(`a new anecdote ${newAnecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField.inputProps()} />
        </div>
        <div>
          author
          <input {...authorField.inputProps()} />
        </div>
        <div>
          url for more info
          <input {...infoField.inputProps()} />
        </div>
        <button>create</button>
        <button type="button"
          onClick={() => {
            contentField.reset()
            authorField.reset()
            infoField.reset()
          }}>
          reset</button>
      </form>
    </div>
  )
}