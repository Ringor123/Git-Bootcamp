import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isError: false,
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = {
        isError: action.payload.isError,
        message: action.payload.message,
      }
      return notification
    },
    clearNotification(state, action) {
      return initialState
    }


  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer