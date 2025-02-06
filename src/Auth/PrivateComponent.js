import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AuthProvider";
import LoginPage from "../pages/LoginPage";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PrivateComponent({ children }) {
  const { token, setToken } = useContext(AppContext);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    const checkValidToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/User/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response?.data?.username) {
          setValid(true);
        } else {
          setValid(false);
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkValidToken();
  }, [token]);

  console.log("obj", token);

  return localStorage.getItem("token") && isValid ? (
    <>{children}</>
  ) : (
    <LoginPage />
  );
}
