import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { initialBlogs, voteBlog, removeBlog, createBlog } from './reducers/blogReducer'
import { userLogin, initializeLoggedUser, userLogout } from './reducers/userReducer'

const App = () => {

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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
  }

  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(userLogin({ username, password }))
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
      dispatch(createBlog(newBlog))
      dispatch(setNotification({
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        isError: false
      }))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      dispatch(setNotification({
        message: 'Error adding new blog',
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

  return (
    <div>
      <Notification message={notification.message} isError={notification.isError} />

      {user === null ? (
        <div>
          <LoginForm
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <p>User {user.username} logged-in  <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <NewBlogForm
              addBlog={addBlog}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}


export default App