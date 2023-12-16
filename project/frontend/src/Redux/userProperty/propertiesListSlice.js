import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPropertiesList: [],
};

export const propertiesListSlice = createSlice({
    name: 'showPropertiesList',
    initialState,
    reducers: {
        addPropertiesList: (state, action) => {
            state.showPropertiesList = action.payload.showPropertiesList;
        },
    }
});

export const { addPropertiesList } = propertiesListSlice.actions;

export default propertiesListSlice.reducer;