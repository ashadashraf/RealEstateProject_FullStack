import { createSlice } from "@reduxjs/toolkit";

export const isGoogleLoggedinSlice = createSlice({
    name: 'showIsGoogleLoggedin',
    initialState: {
        value: false
    },
    reducers: {
        setShowIsGoogleLoggedin: (state, action) => {
            state.value = action.payload.showIsGoogleLoggedin
        }
    }
})

export const {setShowIsGoogleLoggedin} = isGoogleLoggedinSlice.actions

export default isGoogleLoggedinSlice.reducer