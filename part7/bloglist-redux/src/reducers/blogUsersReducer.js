import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const getUsersList = () => {
  return async dispatch => {
    try {
      const allUsers = await userService.getAll()
      // console.log(allUsers)
      dispatch(setUsers(allUsers))
    } catch (error) {
      console.error(error)
    }
  }
}

export default usersSlice.reducer
export const { setUsers } = usersSlice.actions