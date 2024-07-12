import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    alignItems: 'center',
  }

  return (
    <div style={blogStyle}>
      {/* <p> */}
      <span className='blog-title'>{blog.title}</span>
      {/* <b>Author: </b><span className='blog-author'>{blog.author}</span>&ensp;
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </p>
      {visible && (
        <div>
          <b>Url: </b><span className='blog-url'>{blog.url}</span><br />
          <b>Likes: </b><span className='blog-likes'>{blog.likes}</span>&ensp;<button onClick={handleUpdate}>like</button>
          {user && blog.user && blog.user.id === user.id && (
            <p><button onClick={handleDelete}>Delete blog</button></p>
          )}
        </div>
      )} */}
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog