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
        updatePropertiesList: (state, action) => {
            const updatedProperty = action.payload.updatedProperty;
            state.showPropertiesList = state.showPropertiesList.map(property => 
                property.id === updatedProperty.id ? updatedProperty : property
            );
        },
    },
});

export const { addPropertiesList, updatePropertiesList } = propertiesListSlice.actions;

export default propertiesListSlice.reducer;