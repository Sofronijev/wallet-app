import { UserDataType } from "store/reducers/userSlice";
import { apiSlice } from "./apiSlice";

export type AuthRequest = {
  email: string;
  password: string;
};

type TokenType = {
  refreshToken: string;
  accessToken: string;
};

export type LoginResponseType = UserDataType & { token: TokenType; };

export type RegisterResponseType = LoginResponseType & { message: string };
export type DeleteUserResponseType = { message: string };

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    loginUser: builder.mutation<LoginResponseType, AuthRequest>({
      query: (loginData: AuthRequest) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
    registerUser: builder.mutation<RegisterResponseType, AuthRequest>({
      query: (registerData: AuthRequest) => ({
        url: "/users/register",
        method: "POST",
        body: registerData,
      }),
    }),
    deleteUser: builder.mutation<DeleteUserResponseType, number>({
      query: (id: number) => ({
        url: "/users/delete",
        method: "POST",
        body: id,
      }),
    }),
  }),
});
export const { useLoginUserMutation, useRegisterUserMutation, useDeleteUserMutation } = authApi;
