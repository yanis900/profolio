import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function MyPortfolioButton() {
  const navigate = useNavigate();

  function myportfolio() {
    localStorage.removeItem("token");
    navigate("/portfolio/:userSlug");
  }

  return <Button variant={'link'} onClick={myportfolio}>My Portfolio</Button>;
}

export default MyPortfolioButton;
