import './Notification.css'

const Notification = ({message}) => {

    console.log(message)
  return (
    <div className={`notification-container ${message==='' ? 'hide' : ''}`}>
        <span>{message}</span>
        <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    </div>
  )
}

export default Notification
