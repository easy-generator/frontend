import { apiGet } from "../../../services/api";

export const getMe = () =>
  apiGet<{ id: string; name: string; email: string }>("/users/me", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
