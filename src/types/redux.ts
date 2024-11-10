import { ICandidate } from "./candidates"
import { IUser } from "./user"

export enum DataStatus {
  LOADING = "LOADING",
  SUCCSES = "SUCCSES",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface userState {
  error: String | null
  status: DataStatus
  user: null | IUser
}

export interface candidatesState {
  error: String | null
  status: DataStatus
  candidates: ICandidate[]
}
