import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ownerSlice from "../../modules/Authorization/RegisterOwner/slice/OwnerSlice";
import ObjectsSlice from '../../modules/Objects/slice/ObjectsSlice'
import OwnerLoginSlice from "../../modules/Authorization/LoginOwner/slice/OwnerLoginSlice";

export const store = configureStore({
    reducer: {
        OwnerLoginSlice,
        ObjectsSlice,
        ownerSlice,

    }
})

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch
export const useAppDispatch: () => Appdispatch = useDispatch