import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='nav'>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/register'}>Register</NavLink>
        <NavLink to={'/votes'}>Votes</NavLink>
        <NavLink to={'/statistics'}>Statistics</NavLink>
        <button onClick={()=>alert("Logout succesfully")}>Logout</button>
    </div>
  )
}
