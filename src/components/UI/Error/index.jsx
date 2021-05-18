import React from 'react'
import './style.scss'

const UIError = ({ className }) => {
  return (
    <div className={`UIError ${className && className}`}>
      Loading...
    </div>
  )
}

export default UIError
