import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationMessage } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    //console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    // dispatch(setNotification('anecdote added succesfully'))
    // setTimeout(() => {
    //   dispatch(clearNotification())
    // },5000)
    dispatch(notificationMessage('anecdote added succesfully', 5000))
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