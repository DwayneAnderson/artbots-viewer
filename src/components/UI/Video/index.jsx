import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import './style.scss'

const Video = ({ src }) => {
  const videoEl = useRef(null)

  useEffect(() => {
    videoEl?.current?.play().catch(error => {
      console.error(`Video error: could not autoplay video: ${src}`, error)
    })
  }, [src])

  if (src.match('.m3u8')) {
    return (
      <ReactPlayer
        url={src}
        playing
        loop
        volume={0}
        muted
        playsInline
        width='100vw'
        height='100vh'
      />
    )
  } else {
    const videoProps = {
      ref: videoEl,
      src: src,
      alt: 'video content',
      playsInline: true,
      loop: true,
      muted: true
    }
    return (
      <video
        {...videoProps}
      />
    )
  }
}

export default Video
