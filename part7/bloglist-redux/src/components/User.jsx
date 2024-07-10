import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList } from '../reducers/blogUsersReducer'

const User = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch])

  const userSelected = users.find(user => user.id === id)
  // console.log(userSelected)

  if (!userSelected) {
    return null
  }

  return (
    <div>
      <div>
        <h1>{userSelected.username}</h1>
      </div>
      <div>
        <h3>added blogs</h3>
      </div>
      <div>
        <ul>
          {userSelected.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User