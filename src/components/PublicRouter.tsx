import { JSX } from "react";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: JSX.Element;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
