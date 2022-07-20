import React from 'react'

const Notification = ({ message, success = false }) => {
  if (message === null) return null
  return (
    <div className={`notification ${success ? 'success' : 'error'}`}>
      {message}
    </div>
  )
}

export default Notification