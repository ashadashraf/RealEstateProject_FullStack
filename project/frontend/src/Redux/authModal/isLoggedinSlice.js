import { createSlice } from "@reduxjs/toolkit";

export const isLoggedinSlice = createSlice({
    name: 'showIsLoggedin',
    initialState: {
        value: false,
        userId: '',
        username: '',
    },
    reducers: {
        setShowIsLoggedin: (state, action) => {
            state.value = action.payload.showIsLoggedin
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId
        },
        setUsername: (state, action) => {
            state.username = action.payload.username
        },
        removeUserData: (state, action) => {
            state.value = false,
            state.userId = null,
            state.username = null
        }
    }
})

export const {setShowIsLoggedin, setUserId, setUsername, removeUserData} = isLoggedinSlice.actions

export default isLoggedinSlice.reducer