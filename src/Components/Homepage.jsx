import React from 'react'
import { NavLink } from 'react-router-dom'

function Homepage() {
  return (
    <div className='w-full h-screen flex justify-between px-5'>
        <span>Homepage</span>
        <NavLink to='/admin-login'>Login</NavLink>
    </div>
  )
}

export default Homepage