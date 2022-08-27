import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../index";

export type UserDataType = {
  id: number;
  username: string;
  email: string;
};

type TokenType = {
  refreshToken: string;
  accessToken: string;
};

export type LoginResponseType = {
  data: UserDataType;
  token: TokenType;
}

export type UserStoreType = {
  data: UserDataType | null;
};

const initialUserState: UserStoreType = {
  data: null,
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

export const getUserData = (state: RootStateType): UserDataType | null => state.user?.data;
export const getUserId = (state: RootStateType): number | undefined => state.user?.data?.id;


export default userSlice.reducer;
