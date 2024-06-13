import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

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