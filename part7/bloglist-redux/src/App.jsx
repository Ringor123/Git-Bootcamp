import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initialBlogs, voteBlog, removeBlog, createBlog } from './reducers/blogReducer'
import { userLogin, initializeLoggedUser, userLogout } from './reducers/userLoginReducer'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import UserList from './components/UsersList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Home from './components/Home'

const App = () => {

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogout())
    navigate('/login')
  }

  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(userLogin({ username, password }))
      await dispatch(initialBlogs())
      navigate('/')
      console.log('Logged-in user ID:', user)
    } catch {
      dispatch(setNotification({
        message: 'Wrong Credentials',
        isError: true
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = {
        ...blogObject,
        user
      }
      await dispatch(createBlog(newBlog))
      dispatch(setNotification({
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        isError: false
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      dispatch(setNotification({
        message: `Error adding new blog ${error.response.data.error}`,
        isError: true
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      console.error('Error adding new blog: ', error)
    }

  }

  const updateBlog = async (blogObject) => {
    try {

      const updatedBlog = {
        ...blogObject,
        user: blogObject.user.id
      }
      await dispatch(voteBlog(blogObject.id, updatedBlog))
      dispatch(setNotification({
        message: `Blog ${blogObject.title} by ${blogObject.author} updated to ${blogObject.likes} likes`,
        isError: false
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      dispatch(setNotification({
        message: `Error updating ${blogObject.title} blog`,
        isError: true
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      console.error('Error adding new blog: ', error)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      dispatch(removeBlog(blogObject.id))
      dispatch(setNotification({
        message: 'Blog removed succesfully',
        isError: false
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      navigate('/')
    } catch (error) {
      dispatch(setNotification({
        message: 'Error removing blog',
        isError: true
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      console.error('Error removing blog: ', error)
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user ? <em>{user.username} logged in <button onClick={handleLogout}>logout</button></em> : <Link style={padding} to="/login">login</Link>}
      </div>
      <h1>Blog App</h1>
      <Notification message={notification.message} isError={notification.isError} />
      <Routes>
        <Route path='/' element={<Home blogFormRef={blogFormRef} blogs={blogs} addBlog={addBlog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />} />
        <Route path='/users' element={user ? <UserList /> : <LoginForm handleLogin={handleLogin} />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<BlogDetails updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />} />
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}


export default App