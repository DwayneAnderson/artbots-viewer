import React, { useEffect, useRef } from 'react'

const Video = ({ src }) => {
  const videoEl = useRef(null)

  useEffect(() => {
    videoEl?.current?.play().catch(error => {
      console.error(`Video error: could not autoplay video: ${src}`, error)
    })
  }, [src])

  return (
    <video
      ref={videoEl}
      src={src}
      alt='artistic video content'
      playsInline
      loop
      muted
    />
  )
}

export default Video
