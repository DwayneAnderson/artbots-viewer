import React from 'react'
import './style.scss'

const UIError = ({ className }) => {
  return (
    <div className={`UIError ${className && className}`}>
      <div className='UIError__Text'>
        Error!
      </div>
    </div>
  )
}

export default UIError
