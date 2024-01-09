import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createObjectQuery, getObjectsQuery } from "../api/api"

interface objectStateI {
    pending: boolean,
    object: any[],
    error: unknown
}

interface createObjectI {
    name: string,
    area: string,
    floors: string,
    address: string,
    isRented: boolean,
    rentalPrice: string,
    owner: string | null,
}

const initialState: objectStateI = {
    pending: false,
    object: [],
    error: false,
}

export const createObjectReq = createAsyncThunk('create/object', async ({ name, area, floors, address, isRented, rentalPrice, owner }: createObjectI, thunkAPI) => {
    try {
        const data: any = await createObjectQuery({ name, area, floors, address, isRented, rentalPrice, owner })

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error.message)
        }

        return thunkAPI.fulfillWithValue(data)
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
})

export const getObjectsReq = createAsyncThunk('get/objects', async (_, thunkAPI) => {
    try {
        const data: any = await getObjectsQuery()

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error.message)
        }

        return thunkAPI.fulfillWithValue(data)
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return 'неизвестная ошибка';

    }

})

const ObjectsSlice = createSlice({
    name: 'objectSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createObjectReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(createObjectReq.fulfilled, (state, action) => {
                state.pending = false
                state.error = false
                state.object.push(action.payload)
            })
            .addCase(createObjectReq.rejected, (state, action) => {
                state.pending = false
                state.error = action.payload
            })
            .addCase(getObjectsReq.pending, (state, action) => {
                state.pending = true
                state.error = false
            })
            .addCase(getObjectsReq.fulfilled, (state, action) => {
                state.pending = false
                state.error = false
                state.object = action.payload
            })
            .addCase(getObjectsReq.rejected, (state, action) => {
                state.pending = false
                state.error = true
            })
    }
})

export default ObjectsSlice.reducer