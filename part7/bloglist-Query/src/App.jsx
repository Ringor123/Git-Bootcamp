import { useRef, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlog, getSortedBlogs, setToken, updateBlog as updateBlogFn, removeBlog } from './requests'
import { useUserDispatch, useUserValue } from './UserContext'
import useNotification from './hooks/useNotification'


const App = () => {
  const setNotification = useNotification()

  const userDispatch = useUserDispatch()

  const userValue = useUserValue()

  const blogFormRef = useRef()

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getSortedBlogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      userDispatch({
        type: 'LOGIN',
        payload: {
          username: user.username,
          id: user.id,
          token: user.token,
        },
      })
    }
  }, [userDispatch])

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const currentBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], currentBlogs.concat(newBlog))
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, false)
    },
    onError: () => {
      setNotification('Error adding new blog', true)
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateBlogFn,
    onSuccess: (updatedBlog) => {
      const currentBlogs = queryClient.getQueryData(['blogs'])
      if (currentBlogs) {
        queryClient.setQueryData(['blogs'], currentBlogs
          .map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog))
          .sort((a, b) => b.likes - a.likes)
      }
      setNotification(`Blog ${updatedBlog.title} by ${updatedBlog.author} updated to ${updatedBlog.likes} likes`, false)
    },
    onError: (updatedBlog) => {
      setNotification(`Error updating ${updatedBlog.title} blog`, true)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: (id) => {
      const currentBlogs = queryClient.getQueryData(['blogs'])
      if (currentBlogs) {
        queryClient.setQueryData(['blogs'], currentBlogs.filter(blog => blog.id !== id))
      }
      setNotification('Blog removed succesfully', false)
    },
    onError: (error) => {
      setNotification(`Error deleting blog: ${error}`, true)
    }
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blogs service not available due to problems in server</div>
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    userDispatch({
      type: 'LOGOUT',
    })
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setToken(user.token)
      userDispatch({
        type: 'LOGIN',
        payload: {
          username: user.username,
          id: user.id,
          token: user.token
        }
      })
      console.log('Logged-in user ID:', user)
    } catch {
      window.localStorage.clear()
      setNotification('Wrong credentials', true)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await newBlogMutation.mutate(blogObject)

  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      user: blogObject.user.id
    }
    await updateBlogMutation.mutate(updatedBlog)
  }

  const deleteBlog = async (blogObject) => {
    removeBlogMutation.mutate(blogObject.id)
  }

  return (
    <div>
      <Notification />

      {userValue === null ? (
        <div>
          <LoginForm
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <p>User {userValue.username} logged-in  <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <NewBlogForm
              addBlog={addBlog}
            />
          </Togglable>
          <h2>blogs</h2>
          {result.data.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={userValue}
            />
          ))}
        </div>
      )}
    </div>
  )
}


export default App