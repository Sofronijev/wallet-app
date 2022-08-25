import { LoginResponseType } from "store/reducers/userSlice";
import { apiSlice } from "./apiSlice";

export type LoginRequest = {
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // builder.query<ReturnValueHere, ArgumentTypeHere>. If there is no argument, use void
    loginUser: builder.mutation<LoginResponseType, LoginRequest>({
      query: (loginData: LoginRequest) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});
export const { useLoginUserMutation } = authApi;

