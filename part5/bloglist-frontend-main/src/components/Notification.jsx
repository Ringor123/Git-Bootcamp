import PropTypes from 'prop-types'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  if (isError === true) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="noError">
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool
}

export default Notification