import { useContext } from "react";
import { AppContext } from "./AuthProvider";
import LoginPage from "../pages/LoginPage";
import { useParams } from "react-router-dom";

export default function PrivateComponent({ children }) {
  const { token, setToken } = useContext(AppContext);

  console.log("obj", token);

  return localStorage.getItem("token") ? <>{children}</> : <LoginPage />;
}
