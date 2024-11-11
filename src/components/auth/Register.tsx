import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/store"

export default function Register() {
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (user?._id) return
    navigate("/votes")
  }, [])
  return <div>Register</div>
}
