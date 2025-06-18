import React from 'react'

function Navbar() {
  return (
    <nav className="navbar bg-slate-800  text-white">
      <div className="mycontainer items-center justify-between px-4 h-14  py-5 flex">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/ &gt;</span>

        </div>
          {/* <ul>
           <li className='flex gap-4'>
            <a className='hover:font-bold' href="/home">Home</a>
            <a className='hover:font-bold' href="#about">About</a>
            <a className='hover:font-bold' href="#services">Services</a>
            <a className='hover:font-bold' href="#contact">Contact</a></li>
        </ul>*/}
        <button class="bg-green-900 hover:bg-green-700 text-white  py-2 rounded-full ring-white ring-1">
        <span className='font-bold px-2 '>
          GITHUB</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
