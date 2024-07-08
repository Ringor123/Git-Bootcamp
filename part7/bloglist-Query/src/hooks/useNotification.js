import { useNotificationDispatch } from '../NotificationContext'

const useNotification = () => {
  const notificationDispatch = useNotificationDispatch()

  const setNotification = (message, isError) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, isError }
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return setNotification
}

export default useNotification