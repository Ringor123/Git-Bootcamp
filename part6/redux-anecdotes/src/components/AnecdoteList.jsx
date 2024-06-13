import { useSelector, useDispatch } from "react-redux"
import filterReducer from "../reducers/filterReducer"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const dispatch = useDispatch()

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  const voteAnecdote = (id) => {
    //console.log('vote', id)
    return {
      type: 'NEW_VOTE',
      payload: {
        id
      }
    }
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <ul key={anecdote.id}>
          <li>
            {anecdote.content}
          </li>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </ul>
      )}
    </div>
  )
}


export default AnecdoteList