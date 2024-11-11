import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { fetchCandidates } from "../../redux/slices/candidatesSlice"
import { DataStatus } from "../../types/redux"
import VoteCard from "./VoteCard"
import { ICandidate } from "../../types/candidates"

export default function Votes() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const { candidates, status, error } = useAppSelector(
    (state) => state.candidates
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate("/login")
    } else {
      dispatch(fetchCandidates())
    }
  }, [user, navigate, dispatch])

  return (
    <div className="vote-list">
      {candidates.length &&
        candidates.map((candidate: ICandidate) => (
          <VoteCard key={candidate._id} candidate={candidate}  />
        ))}
    </div>
  )
}
