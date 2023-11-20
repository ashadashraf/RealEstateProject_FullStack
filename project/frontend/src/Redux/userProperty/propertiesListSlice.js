import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const propertiesListSlice = createSlice({
    name: 'showPropertiesList',
    initialState,
    reducers: {
        addPropertiesList: (state, action) => {
            return {
                ...state,
                ...action.payload,
                properties: action.payload.propertiesList,
            };
        },
    }
});

export const { addPropertiesList } = propertiesListSlice.actions;

export default propertiesListSlice.reducer;