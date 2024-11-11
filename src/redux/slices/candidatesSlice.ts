import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { DataStatus, candidatesState } from "../../types/redux"
import { ICandidate } from "../../types/candidates"

const initialState: candidatesState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
}

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return thunkApi.rejectWithValue("No token found")
      }
      const res = await fetch("http://localhost:1234/api/candidates/", {
        headers: {
          authorization: token,
        },
      })
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't get the list, please try again")
      }
      const data = await res.json()
      return data
    } catch (err) {
      thunkApi.rejectWithValue("Can't get the list, please try again")
    }
  }
)

export const voteForCandidate = createAsyncThunk(
  "candidates/voteForCandidate",
  async (candidateId: string, thunkApi) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return thunkApi.rejectWithValue("No token found")
      }
      const res = await fetch(
        `http://localhost:1234/api/candidates/vote/${candidateId}`,
        {
          method: "post",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't vote, please try again")
      }
      const data = await res.json()
      return data
    } catch (err) {
      thunkApi.rejectWithValue("Can't vote, please try again")
    }
  }
)

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<candidatesState>) => {
    builder
      .addCase(fetchCandidates.pending, (state, action) => {
        state.status = DataStatus.LOADING
        state.error = null
        state.candidates = []
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCSES
        state.error = null
        state.candidates = action.payload as unknown as ICandidate[]
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.candidates = []
      })
  },
})

export default candidatesSlice
