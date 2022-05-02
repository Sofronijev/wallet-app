import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootStateType } from "../store";

type UserDataType = {
  id: number;
  name: string;
  email: string;
};

type TokenType = {
  refreshToken: string;
  accessToken: string;
};

export type UserStoreType = {
  data: UserDataType | null;
  token: TokenType | null;
};

const initialUserState: UserStoreType = {
  data: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    clearUserData: () => {
      return initialUserState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, action: PayloadAction<UserStoreType>) => {
        return action.payload;
      }
    );
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { clearUserData } = userSlice.actions;

export const getUserData = (state: RootStateType) => state.user;
export const getUserToken = (state: RootStateType) => state.user?.token;
export const isUserLoggedIn = (state: RootStateType): boolean => (!!state.user?.token && !!state.user?.data) ?? false;

export default userSlice.reducer;
