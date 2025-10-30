import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function FindProfileButton() {
  const navigate = useNavigate();

  function FindProfile() {
    navigate("/search");
  }

  return <Button variant={'link'} onClick={FindProfile} className={'text-white'}>Find A Profile</Button>;
}

export default FindProfileButton;
