import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
        <Router>
          <Switch>
            <Route exact path='/'>
              <Index />
            </Route>
            <Route path='/list/:listId?'>
              <Index />
            </Route>
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  )
}

export default App
