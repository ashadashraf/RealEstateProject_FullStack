import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactionType: '',
    address: '',
    unit: '',
    city: '',
    state: '',
    pincode: null,
    coordinates: {lat: 0, lng: 0},
}

export const propertyAddressSlice = createSlice({
    name: 'showPropertyAddress',
    initialState,
    reducers: {
        addAddress: (state, action) => {
            return {
                ...state,
                ...action.payload,
                coordinates: {
                    lng: action.payload.lng,
                    lat: action.payload.lat,
                },
            };
        },
        resetPropertyAddress: (state) => initialState,
        removePropertyElement: (state, action) => {
            const { [action.payload]: deletedProperty, ...newState } = state;
            return newState;
        },
    }
});

export const { addAddress, resetPropertyAddress, removePropertyElement } = propertyAddressSlice.actions;

export default propertyAddressSlice.reducer;