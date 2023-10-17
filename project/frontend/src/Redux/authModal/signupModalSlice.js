import { createSlice } from '@reduxjs/toolkit';

export const signupModalSlice = createSlice({
    name: 'showSignupModal',
    initialState: {
        value: false
    },
    reducers: {
        setShowSignupModal: (state, action) => {
            state.value = action.payload.showSignupModal
        }
    }
})

export const {setShowSignupModal} = signupModalSlice.actions

export default signupModalSlice.reducer