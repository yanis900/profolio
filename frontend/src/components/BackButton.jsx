import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return <Button variant={'ghost'} onClick={goHome}><ArrowLeft /> Back</Button>;
}

export default BackButton;
