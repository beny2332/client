export interface IUser extends Document {
  id: string  
  username: string
  isAdmin: boolean
  hasVoted: boolean
  votedFor: string | null
}
