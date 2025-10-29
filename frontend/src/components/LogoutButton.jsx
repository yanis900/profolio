import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  return <Button variant={'link'} onClick={logOut}>Log out</Button>;
}

export default LogoutButton;
