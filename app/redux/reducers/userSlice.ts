import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatus } from "../../modules/types";
import { RootStateType } from "../store";

type UserType = {
  id: number;
  name: string;
  surname: string;
  username: string;
  refreshToken: string;
  accessToken: string;
};

type UserStateType = {
  user: UserType | null;
  userFetchStatus: FetchStatus;
};

const initialUserState: UserStateType = {
  user: null,
  userFetchStatus: FetchStatus.success,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.userFetchStatus = FetchStatus.success;
    },
    setUserFetchingStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.userFetchStatus = action.payload;
    },
    clearUserData: () => {
      return initialUserState;
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
