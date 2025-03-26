import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar2 from './components/Calendar2'
import GlassView from './components/GlassView'
import UserData from './components/UserData'
import InputArea from './components/InputArea'
import Test2 from './components/Test2'
import Calendar from './components/Calendar'
import { useRef } from 'react'

function App() {

  const internalRef = useRef()

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      
      <Calendar2 />
      {/* <Test /> */}
      {/* <Calendar /> */}
      <GlassView />
      {/* <Test2  ref={internalRef}/> */}
      {/* <UserData /> */}
    </div>
  )
}

export default App
