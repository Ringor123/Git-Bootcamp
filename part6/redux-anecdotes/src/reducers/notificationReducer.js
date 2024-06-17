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

export default notificationSlice.reducer
export const { clearNotification, setNotification } = notificationSlice.actions