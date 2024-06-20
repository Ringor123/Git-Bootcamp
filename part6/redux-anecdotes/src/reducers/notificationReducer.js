import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification(state, action) {
      return ""
    },
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const notificationMessage = (message, timeout) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer
export const { clearNotification, setNotification } = notificationSlice.actions