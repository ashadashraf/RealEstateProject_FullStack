import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const propertyDetailSlice = createSlice({
    name: 'showPropertyDetail',
    initialState,
    reducers: {
        addPropertyDetail: (state, action) => {
            return {
                ...state,
                ...action.payload,
                property: action.payload.propertyDetail,
            };
        },
    }
});

export const { addPropertyDetail } = propertyDetailSlice.actions;

export default propertyDetailSlice.reducer;