const Notification = ({ message, error }) => {
    if (message === null) {
      return null
    } else if (error === true) {
      return (
        <div className="error">
          {message}
        </div>
      )
    } else return (
      <div className="add">
        {message}
      </div>
    )
  }

  export default Notification