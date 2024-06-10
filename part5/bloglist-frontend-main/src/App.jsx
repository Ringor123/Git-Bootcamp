import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setIsError(true)
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async ( blogObject ) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      const sortedBlogs = [...blogs, returnedBlog].sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
      blogService.getAll().then(blogs => setBlogs(blogs))
      setIsError(false)
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (error) {
      setIsError(true)
      setErrorMessage('Error adding new blog')
      setTimeout(() => {
        setErrorMessage(null)
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
      setIsError(false)
      setErrorMessage(`Blog ${blogObject.title} by ${blogObject.author} updated to ${blogObject.likes} likes`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setIsError(true)
      setErrorMessage(`Error updating ${blogObject.title} blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.error('Error adding new blog: ', error)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setIsError(false)
      setErrorMessage('Blog removed successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setIsError(true)
      setErrorMessage('Error removing blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.error('Error removing blog: ', error)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} isError={isError} />

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