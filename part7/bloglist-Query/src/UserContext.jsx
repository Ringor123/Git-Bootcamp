import { useReducer, createContext, useContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}

const initialState = null

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const context = useContext(UserContext)
  return context[0]
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  return context[1]
}

export default UserContext