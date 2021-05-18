import React from 'react'
import './style.scss'

const UILoading = ({ className }) => {
  return (
    <div className={`UILoading ${className && className}`}>
      Loading...
    </div>
  )
}

export default UILoading
