import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DatabaseList from './pages/DatabaseList'
import SignIn from './pages/SignIn'

function App() {

  return (
    <div className="App">
      {/* <DatabaseList /> */}
      <SignIn />
    </div>
  )
}

export default App
