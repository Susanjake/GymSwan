import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from './components/Calendar'
import Test from './components/Test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Calendar />
      {/* <Test /> */}
    </>
  )
}

export default App
