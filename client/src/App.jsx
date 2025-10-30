import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthWrapper } from './auth/Authwrapper';
import useDarkModeEffect from './hooks/useDarkModeEffects';


const App = () => {

  useDarkModeEffect();

  return (
    <>
      <Router>
        <AuthWrapper />
      </Router>
    </>

  )
}

export default App;