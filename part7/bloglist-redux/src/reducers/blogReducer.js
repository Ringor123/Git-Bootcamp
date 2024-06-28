import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    appendBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = () => {
  return async dispatch => {
    const newBlog = await blogService.create()
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
export const { appendBlog, setBlogs } = blogSlice.actions
