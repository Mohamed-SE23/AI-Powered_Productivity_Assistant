import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthWrapper } from './auth/Authwrapper';


const App = () => {

  return (
    <>
      <Router>
        <AuthWrapper />
      </Router>
    </>

  )
}

export default App;