import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerOwnerQuery } from "../api/api";


interface ownerStateI {
    signUpLoading: boolean
    owner: {}
    error: unknown
}

interface registerOwnerI {
    ownerName: string
    email: string
    password: string
}

const initialState: ownerStateI = {
    signUpLoading: false,
    owner: {},
    error: false,
}

export const registerOwnerReq = createAsyncThunk('register/owner', async ({ ownerName, email, password }: registerOwnerI, thunkAPI) => {
    try {
        const data = await registerOwnerQuery({ ownerName, email, password })

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }

        return thunkAPI.fulfillWithValue(data)
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

const OwnerSlice = createSlice({
    name: 'ownerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerOwnerReq.pending, (state, action) => {
                state.signUpLoading = true
                state.error = false
            })
            .addCase(registerOwnerReq.fulfilled, (state, action) => {
                state.signUpLoading = false
                state.error = false
                state.owner = action.payload
            })
            .addCase(registerOwnerReq.rejected, (state, action) => {
                state.signUpLoading = false
                state.error = action.payload
            })
    }
})

export default OwnerSlice.reducer