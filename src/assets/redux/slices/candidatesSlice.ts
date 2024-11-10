import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { DataStatus, candidatesState } from "../../../types/redux"
import { ICandidate } from "../../../types/candidates"

const initialState: candidatesState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
}

export const fetchCandidates = createAsyncThunk(
  "candidates/",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:1234/api/candidates/")
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't get the list, please try again")
      }
      const data = await res.json()
      thunkApi.fulfillWithValue(data)
    } catch (err) {
      thunkApi.rejectWithValue("Can't get the list, please try again")
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
