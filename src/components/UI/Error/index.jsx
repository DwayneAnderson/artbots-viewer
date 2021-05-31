import React from 'react'
import './style.scss'

const UIError = ({ className, message = null }) => {
  return (
    <div className={`UIError ${className && className}`}>
      <div className='UIError__Title'>
        Error!
      </div>
      {message && (
        <div className='UIError__Message'>
          {message}
        </div>
      )}
    </div>
  )
}

export default UIError
