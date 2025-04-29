import React from 'react'

const Toast = ({msg, toastClass}) => {
  return (
    <div className="toast toast-top toast-center">
    <div className={toastClass? `alert ${toastClass}`: `alert alert-success`}>
        <span>{msg}</span>
    </div>
    </div>
  )
}

export default Toast
