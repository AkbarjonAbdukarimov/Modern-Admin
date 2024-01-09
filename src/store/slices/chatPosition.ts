import { createSlice } from "@reduxjs/toolkit";

export interface chatPositionState {
  chatPosition: Boolean;
}

const initialState: chatPositionState = {
  chatPosition: false,
};

export const ChatPositionSlice = createSlice({
  name: "chatPosition",
  initialState,
  reducers: {
    openChat: (state) => {
      state.chatPosition = true;
    },
    closeChat: (state) => {
      state.chatPosition = false;
    },
  },
});

export default ChatPositionSlice.reducer;
export const { openChat, closeChat } = ChatPositionSlice.actions;
