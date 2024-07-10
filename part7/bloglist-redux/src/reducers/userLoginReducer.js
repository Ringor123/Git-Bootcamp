import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    loginUser(state, action) {
      const user = action.payload
      return user
    },
    logoutUser(state, action) {
      return null
    },
  }
})

export const userLogin = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(loginUser(user))
  }
}

export const initializeLoggedUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(loginUser(user))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }
}

export default loginSlice.reducer
export const { loginUser, logoutUser, userList } = loginSlice.actions