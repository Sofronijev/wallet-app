export type LoginRequest = {
  email: string;
  password: string;
};

export const loginUserQuery = (loginData: LoginRequest) => ({
  url: "/users/login",
  method: "POST",
  body: loginData,
});
