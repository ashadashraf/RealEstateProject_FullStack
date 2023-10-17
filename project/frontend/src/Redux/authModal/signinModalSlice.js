import { createSlice } from "@reduxjs/toolkit";

export const signinModalSlice = createSlice({
    name: 'showSigninModal',
    initialState: {
        value: false
    },
    reducers: {
        setShowSigninModal: (state, action) => {
            state.value = action.payload.showSigninModal
        }
    }
})

export const {setShowSigninModal} = signinModalSlice.actions

export default signinModalSlice.reducer