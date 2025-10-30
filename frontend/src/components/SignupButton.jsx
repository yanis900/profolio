import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function SignupButton() {
  const navigate = useNavigate();

  function signUp() {
    navigate("/signup");
  }

  return <Button variant={'link'} onClick={signUp} className={'text-white'}>Sign Up</Button>;
}

export default SignupButton;
