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
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog )
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch(appendBlog(blog))
  }
}

export const voteBlog = (id, updatedBlog) => {
  return async dispatch => {
    const blogToUpdate = await blogService.update(id, updatedBlog)
    dispatch(updateBlog(blogToUpdate))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(id)
    dispatch(deleteBlog(deletedBlog))
  }
}

export default blogSlice.reducer
export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions
