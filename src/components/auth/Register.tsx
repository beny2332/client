import React, { useState } from "react"
import { useAppDispatch } from "../../redux/store"
import { fetchRegister } from "../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const handleRegister = async () => {
    const resultAction = await dispatch(
      fetchRegister({ username, password, isAdmin })
    )
    if (fetchRegister.fulfilled.match(resultAction)) {
      navigate("/login")
    } else {
      // Handle registration error if needed
      console.error(resultAction.payload)
    }
  }

  return (
    <div>
      <input
        name="inp-name-register"
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="inp-pswd-register"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        Admin
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}
