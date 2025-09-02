import { apiPost } from "../../../services/api";
interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export const signIn = (data: SignInPayload) =>
  apiPost<{ token: string; user: { id: string; name: string; email: string } }>(
    "/users/signin",
    data
  );

export const signUp = (data: SignUpPayload) =>
  apiPost<{ id: string; name: string; email: string }>("/users/signup", data);
