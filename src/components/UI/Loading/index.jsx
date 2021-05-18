import React from 'react'
import './style.scss'

const UILoading = ({ className }) => {
  return (
    <div className={`UILoading ${className && className}`}>
      <div className='UILoading__Animation'>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className='UILoading__Text'>loading...</div>
    </div>
  )
}

export default UILoading
