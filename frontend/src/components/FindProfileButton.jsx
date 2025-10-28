import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function FindProfileButton() {
  const navigate = useNavigate();

  function FindProfile() {
    localStorage.removeItem("token");
    navigate("/search");
  }

  return <Button variant={'link'} onClick={FindProfile}>Find A Profile</Button>;
}

export default FindProfileButton;
