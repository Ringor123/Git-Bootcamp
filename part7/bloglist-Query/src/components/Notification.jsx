import PropTypes from 'prop-types'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  const notification = useNotificationValue()

  if (notification.message === null) {
    return null
  }
  if (notification.isError === true) {
    return (
      <div className="error">
        {notification.message}
      </div>
    )
  }
  return (
    <div className="noError">
      {notification.message}
    </div>
  )
}

export default Notification