import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(id)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, setAnecdote, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer