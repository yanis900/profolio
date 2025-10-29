import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function SignupButton() {
  const navigate = useNavigate();

  function signUp() {
    localStorage.removeItem("token");
    navigate("/signup");
  }

  return <Button variant={'link'} onClick={signUp}>Sign Up</Button>;
}

export default SignupButton;
