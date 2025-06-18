import React from 'react'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'
const App = () => {
  return (
    <div>
      <Navbar/>
      <div className='min-h-[80vh'>
      <Manager/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
