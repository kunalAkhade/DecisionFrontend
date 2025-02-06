import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AuthProvider";
import LoginPage from "../pages/LoginPage";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PrivateComponent({ children }) {
  const { token, setToken } = useContext(AppContext);
  const [isValid, setValid] = useState(false);

  const checkValidToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/User/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setValid(response.data?.isValid);
    } catch (e) {
      setValid(false);
      localStorage.removeItem("token");
      console.log(e);
    }
  };

  checkValidToken();

  console.log("In private Component", isValid);

  return localStorage.getItem("token") && isValid ? (
    <>{children}</>
  ) : (
    <LoginPage />
  );
}
