import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Index from './../Index'
import Error from './../UI/Error'

import './style.scss'

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={Error}
    >
      <div className='App'>
        <Index />
      </div>
    </ErrorBoundary>
  )
}

export default App
