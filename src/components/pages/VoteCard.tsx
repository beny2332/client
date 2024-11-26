import { ICandidate } from "../../types/candidates"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { fetchProfileUpdate } from "../../redux/slices/userSlice"
import { fetchCandidates } from "../../redux/slices/candidatesSlice"
import { socket } from "../../main"

interface props {
  candidate: ICandidate
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const handleVote = async () => {
    if (user?.hasVoted) {
      alert("You have already voted.")
      return
    }
    try {
      await fetch("https://elections-server.onrender.com/votes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage["token"]!,
        },
        body: JSON.stringify({
          candidateId: candidate._id,
          userId: user?._id,
        }),
      })
      dispatch(fetchCandidates())
      dispatch(fetchProfileUpdate(user?._id!))
      socket.emit("newVote")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="vote-card">
      <h1 className="label">
        {candidate.name}
        <span className="badge">{candidate.votes}</span>
      </h1>
      <img src={candidate.image} alt={candidate.name} />
      <button onClick={handleVote} disabled={user?.hasVoted}>
        {user?.hasVoted
          ? "You have already voted"
          : `VOTE FOR ${candidate.name}`}
      </button>
    </div>
  )
}
