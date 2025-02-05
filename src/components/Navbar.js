import { useContext } from "react";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Auth/AuthProvider";
function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const handleClick = (url) => {
    navigate(url);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <div className="nav-main">
      <div onClick={() => handleClick("/")}>Add Task</div>
      <div onClick={() => handleClick("/tasklist")}>View Tasks</div>
      <div onClick={() => handleClick("/categorylist")}>My Categories</div>
      <div onClick={() => handleClick("/sign")}>Create User</div>
      {token ? <div onClick={() => logout()}>Logout</div> : <></>}
    </div>
  );
}

export default Navbar;
