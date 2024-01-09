import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginOwnerQuery } from "../api/api"

interface ownerStateI {
    token: string | null
    signInLoading: boolean
    owner: {}
    error: unknown
}

interface loginOwnerI {
    ownerName: string
    password: string
}

const initialState: ownerStateI = {
    token: localStorage.getItem('token'),
    signInLoading: false,
    owner: {},
    error: false,
}

export const loginOwnerReq = createAsyncThunk('login/owner', async ({ ownerName, password }: loginOwnerI, thunkAPI) => {
    try {
        const data = await loginOwnerQuery({ ownerName, password })
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('ownerId', data.ownerId)
        return thunkAPI.fulfillWithValue(data)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

const OwnerLoginSLice = createSlice({
    name: 'ownerLoginSlice',
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem('token')
            state.token = null
            state.owner = {}
            state.error = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginOwnerReq.pending, (state, action) => {
                state.error = false
                state.signInLoading = true
            })
            .addCase(loginOwnerReq.rejected, (state, action) => {
                state.signInLoading = false
                state.error = action.payload
            })
            .addCase(loginOwnerReq.fulfilled, (state, action) => {
                state.signInLoading = false
                state.error = false
                state.token = action.payload.token
            })
    }
})




export const { logOut } = OwnerLoginSLice.actions;
export default OwnerLoginSLice.reducer