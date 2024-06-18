import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
  
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    //console.log(content)
    event.target.anecdote.value = ''
    const newAnecdote = await noteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification('anecdote added succesfully'))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm