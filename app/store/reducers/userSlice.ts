import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../index";

export type UserDataType = {
  id: number;
  username: string;
  email: string;
};

export type UserStoreType = {
  data: UserDataType;
};

const initialUserState: UserStoreType = {
  data: { id: 0, username: "", email: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataType>) => {
      state.data = action.payload;
    },
    clearUserData: () => {
      return initialUserState;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const getUserData = (state: RootStateType): UserDataType => state.user.data;
export const getUserId = (state: RootStateType): number => state.user.data.id;

export default userSlice.reducer;
