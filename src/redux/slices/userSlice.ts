import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { DataStatus, userState } from "../../types/redux"

const initialState: userState = {
  error: null,
  status: DataStatus.IDLE,
  user: null,
}

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { username: string; password: string }, thunkApi) => {
    try {
      const res = await fetch("http://localhost:1234/api/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't login, please try again")
      }
      const data = await res.json()
      // thunkApi.fulfillWithValue(data);
      localStorage.setItem("token", data.token)
      return data
    } catch (err) {
      thunkApi.rejectWithValue("Can't login, please try again")
    }
  }
)

export const fetchProfileUpdate = createAsyncThunk(
  "user/profile",
  async (id: string, thunkApi) => {
    try {
      const res = await fetch("http://localhost:1234/api/users/profile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage["token"]!,
        },
        body: JSON.stringify({ id }),
      })
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't update profile, please try again")
      }
      const data = await res.json()
      return data
    } catch (err) {
      thunkApi.rejectWithValue("Can't login, please try again")
    }
  }
)

export const fetchRegister = createAsyncThunk(
  "user/register",
  async (
    user: { username: string; password: string; isAdmin: boolean },
    thunkApi
  ) => {
    try {
      const res = await fetch("http://localhost:1234/api/users/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't register, please try again")
      }
      const data = await res.json()
      return data
    } catch (err) {
      thunkApi.rejectWithValue("Can't register, please try again")
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder
      .addCase(fetchLogin.pending, (state ) => {
        state.status = DataStatus.LOADING
        state.error = null
        state.user = null
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCSES
        state.error = null
        state.user = action.payload as any
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.user = null
      })
      .addCase(fetchProfileUpdate.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }
      })
  },
})

export default userSlice
