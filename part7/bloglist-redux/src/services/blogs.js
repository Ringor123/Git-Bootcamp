import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    console.error('Error getting blogs: ', error)
    throw error
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error creating blog: ', error)
    throw error
  }
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  } catch (error) {
    console.error('Error updating blog: ', error)
    throw error
  }
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    await axios.delete(`${baseUrl}/${id}`, config)
    // return response.data
    return id
  } catch (error) {
    console.error('Error deleting blog: ', error)
    throw error
  }
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, setToken, create, update, remove , addComment }