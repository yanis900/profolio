import { Link } from "react-router-dom";
import "./HomePage.css";
import { DialogDemo } from "@/components/DialogDemo";
import { TabsDemo } from "@/components/TabsDemo";

export function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to Profolio!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      <DialogDemo />
      <TabsDemo />
    </div>
  );
}
