import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useNavigate } from "react-router-dom"

export default function Votes() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const navigator = useNavigate()
  useEffect(() => {
    if (!user?._id) {
      navigator("/login")
    }
  }, [])
  return <div>Votes</div>
}
