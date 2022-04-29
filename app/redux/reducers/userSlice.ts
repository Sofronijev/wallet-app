import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../store";

type AuthStateType = {
  id: number;
  name: string;
  surname: string;
  username: string;
  refreshToken: string;
  accessToken: string;
};

const initialAuthState: AuthStateType = {
  id: 0,
  name: "",
  surname: "",
  username: "",
  refreshToken: "",
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthStateType>) => {
      return action.payload;
    },
    clearUserData: (state) => {
      state = initialAuthState;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => {
      return state;
    });
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export const getUserData = (state: RootStateType) => state.user;

export default userSlice.reducer;
