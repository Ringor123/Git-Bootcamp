import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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
      const returnedBlog = await blogService.create(blogObject)
      const sortedBlogs = [...blogs, returnedBlog].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
      blogService.getAll().then(blogs => setBlogs(blogs))
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

      const returnedBlog = await blogService.update(blogObject.id, updatedBlog)
      const updatedBlogs = blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog)
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
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
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
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