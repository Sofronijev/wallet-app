import { LoginResponseType, RegisterResponseType } from "store/reducers/userSlice";
import { apiSlice } from "./apiSlice";

export type AuthRequest = {
  email: string;
  password: string;
};

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
  }),
});
export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
