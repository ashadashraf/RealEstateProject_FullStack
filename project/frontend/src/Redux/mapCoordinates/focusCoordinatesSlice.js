import { createSlice } from '@reduxjs/toolkit';

export const focusCoordinatesSlice = createSlice({
    name: 'focusCoordinates',
    initialState: {
        lng: 76.2494,
        lat: 9.9477,
    },
    reducers: {
        setLng: (state, action) => {
            state.lng = action.payload;
        },
        setLat: (state, action) => {
            state.lat = action.payload;
        },
    },
});

export const { setLng, setLat } = focusCoordinatesSlice.actions;
export default focusCoordinatesSlice.reducer;