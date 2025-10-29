import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { getUserById } from "../services/user";
import { useEffect, useState } from "react";

function MyPortfolioButton() {
  const navigate = useNavigate();
  const [userSlug, setUserSlug] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserById(token)
        .then((data) => {
          const user = data.user;
          const slug = `${user.firstname}-${user.lastname}-${user._id.slice(-6)}`;
          setUserSlug(slug);
        })
        .catch((err) => console.error("Failed to get user:", err));
    }
  }, []);

  function myportfolio() {
    if (userSlug) {
      navigate(`/portfolio/${userSlug}`);
    }
  }

  return <Button variant={'link'} onClick={myportfolio}>My Portfolio</Button>;
}

export default MyPortfolioButton;
