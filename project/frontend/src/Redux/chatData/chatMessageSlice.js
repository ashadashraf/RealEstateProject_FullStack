import { createSlice } from '@reduxjs/toolkit';

export const chatMessageSlice = createSlice({
    name: 'chatMessages',
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export const { setMessages, addMessage } = chatMessageSlice.actions;
export default chatMessageSlice.reducer;