import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  if (isError === true) {
    return (
      <Alert variant='danger'>
        {message}
      </Alert>
    )
  }
  return (
    <Alert variant='success'>
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool
}

export default Notification