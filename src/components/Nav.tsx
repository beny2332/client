import React from "react"
import { NavLink } from "react-router-dom"
import { RootState, useAppSelector } from "../redux/store"

export default function Nav() {
  const user = useAppSelector((state: RootState) => state.user)
  return (
    <div className="nav">
      {user.user ? (
        <>
          <NavLink to={"/votes"}>Votes</NavLink>
          {user.user.isAdmin && <NavLink to={"/statistics"}>Statistics</NavLink>}
          <button onClick={() => alert("Logout succesfully")}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </>
      )}
    </div>
  )
}
