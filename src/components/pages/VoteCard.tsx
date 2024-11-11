import React from "react";
import { ICandidate } from "../../types/candidates";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import userSlice, {
  fetchLogin,
  fetchProfileUpdate,
} from "../../redux/slices/userSlice";
import { fetchCandidates } from "../../redux/slices/candidatesSlice";

interface props {
  candidate: ICandidate;
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleVote = async () => {
    try {
      const data = await fetch("http://localhost:1234/api/votes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage["token"]!,
        },
        body: JSON.stringify({
          candidateId: candidate._id,
          userId: user?._id,
        }),
      });
      dispatch(fetchCandidates());
      dispatch(fetchProfileUpdate(user?._id!));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="vote-card">
      <h1>
        {candidate.name}
        <span className="badge">{candidate.votes}</span>
      </h1>
        <img src={candidate.image} alt={candidate.name} />
      <button onClick={handleVote}>VOTE</button>
    </div>
  );
}
