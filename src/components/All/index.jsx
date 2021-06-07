import React from 'react'
import './style.scss'

const All = () => (
  <div className='All'>
    {(new Array(24).fill(null)).map((screen, i) => (
      <iframe key={i} src='/list/all' title={`screen-${i}`} />
    ))}
  </div>
)

export default All
