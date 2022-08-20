import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "api/apiSlice";
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
  data: UserDataType | null;
  token: TokenType | null;
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
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, action: PayloadAction<LoginResponseType>) => {
        state.data = action.payload.data;
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const getUserData = (state: RootStateType): UserDataType | null => state.user?.data;


export default userSlice.reducer;
