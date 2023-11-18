import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../index";
import { SliceAction } from "store/type";

export type UserDataType = {
  id: number;
  username: string;
  email: string;
};

const initialUserState: UserDataType = {
  id: 0,
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action: SliceAction<UserDataType>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUserData: () => {
      return initialUserState;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const getUserData = (state: RootStateType): UserDataType => state.user;
export const getUserId = (state: RootStateType): number => state.user.id;

export default userSlice.reducer;
