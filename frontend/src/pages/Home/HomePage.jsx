import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { PublicNavbar } from "../../components/PublicNavbar";

// import { DialogDemo } from "@/components/DialogDemo";
// import { TabsDemo } from "@/components/TabsDemo";

export function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(token !== null);
  }, [loggedIn]);

  return (
    <>
    <PublicNavbar />
    <div className="home">
      <h1>Welcome to Profolio!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      {/* <DialogDemo /> */}
      {loggedIn ? <p>logged in</p> : ""}
    </div>
    </>
  );
}
