import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    propertyDetail: [],
};

export const propertyDetailSlice = createSlice({
    name: 'showPropertyDetail',
    initialState,
    reducers: {
        addPropertyDetail: (state, action) => {
            state.propertyDetail = action.payload.propertyDetail;
        },
        updatePropertyLike: (state, action) => {
            const updatedLike = action.payload.updatedLike;
            state.propertyDetail[0].liked = updatedLike;
        },
    }
});

export const { addPropertyDetail, updatePropertyLike } = propertyDetailSlice.actions;

export default propertyDetailSlice.reducer;