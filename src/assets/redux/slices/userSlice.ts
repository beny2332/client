import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DataStatus, userState } from "../../../types/redux"
import { IUser } from "../../../types/user"

const initialState:userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null
}

const fetchLogin = createAsyncThunk('user/login', 
    async (user:{username:string, password:string}, thunkApi) => {
        try {
            const res = await fetch('http://localhost:1234/api/users/login', {
                method: "post",
                headers:{
                    'Content-Type':'aplication/json'
                },
            body:JSON.stringify(user)
            })
            if (res.status != 200){
                thunkApi.rejectWithValue("Can't login, please try again")
            }
            const data = await res.json()
            thunkApi.fulfillWithValue(data)
        } catch (err) {
            thunkApi.rejectWithValue("Can't login, please try again")
        }
    }
)

const fetchRegister = createAsyncThunk('user/register', 
    async (user:{username:string, password:string, isAdmin: boolean}, thunkApi) => {
        try {
            const res = await fetch('http://localhost:1234/api/users/register', {
                method: "post",
                headers:{
                    'Content-Type':'aplication/json'
                },
            body:JSON.stringify(user)
            })
            if (res.status != 200){
                thunkApi.rejectWithValue("Can't create new user, please try again")
            }
            const data = await res.json()
            thunkApi.fulfillWithValue(data)
        } catch (err) {
            thunkApi.rejectWithValue("Can't create new user, please try again")
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder:ActionReducerMapBuilder<userState>) =>{
        builder.addCase(fetchLogin.pending, (state, action) =>{
            state.status = DataStatus.LOADING
            state.error = null
            state.user = null
        }).addCase(fetchLogin.fulfilled, (state, action) =>{
            state.status = DataStatus.SUCCSES
            state.error = null
            state.user = action.payload as any
        }).addCase(fetchLogin.rejected, (state, action) =>{
            state.status = DataStatus.FAILED
            state.error = action.error as string
            state.user = null
        })
    }
})