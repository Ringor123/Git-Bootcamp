import axios from 'axios'

const blogsBaseUrl = 'http://localhost:3001/api/blogs'
const loginBaseUrl = 'http://localhost:3001/api/login'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getSortedBlogs = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(blogsBaseUrl, config)
  const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
  return sortedBlogs
}

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(blogsBaseUrl, newBlog, config)
  return response.data
}

export const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${blogsBaseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

export const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${blogsBaseUrl}/${id}`, config)
  return id
}

export const userLogin = async (credentials) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(loginBaseUrl, credentials, config)
  return response.data
}
