import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // appendBlog(state, action) {
    //   const newBlog = action.payload
    //   state.push(newBlog)
    // },
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
    },
  }
})

export const initialBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    const sortedBlogs = [...allBlogs].sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    const blog = await blogService.create(newBlog)
    const sortedBlogs = [...allBlogs, blog].sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const voteBlog = (id, updatedBlog) => {
  return async dispatch => {
    const blogToUpdate = await blogService.update(id, updatedBlog)
    dispatch(updateBlog(blogToUpdate))
    const allBlogs = await blogService.getAll()
    const sortedBlogs = [...allBlogs].sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(id)
    dispatch(deleteBlog(deletedBlog))
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions
