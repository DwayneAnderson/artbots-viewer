import React, { useEffect, useRef } from 'react'

export default function App ({ src }) {
  const videoEl = useRef(null)

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error('Error attempting to play', error)
      })
  }

  useEffect(() => {
    attemptPlay()
  }, [])

  return (
    <video
      playsInline
      loop
      muted
      alt='All the devices'
      src={src}
      ref={videoEl}
    />
  )
}
