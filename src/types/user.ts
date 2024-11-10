export interface IUser extends Document {
  _id: string  
  username: string
  isAdmin: boolean
  hasVoted: boolean
  votedFor: string | null
}
