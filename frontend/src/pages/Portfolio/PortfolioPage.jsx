import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton"

import { getUserById, getUserBySlug } from "../../services/user";
import { TabsDemo } from "@/components/TabsDemo";
import { Card } from "@/components/ui/card";

export function PortfolioPage() {
  const { userSlug } = useParams();
  const [me, setMe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getUserById(token)
        .then((data) => {
          setMe(data.user);
        })
        .catch((err) => {
          console.error(err);
        });
      getUserBySlug(token, userSlug)
        .then((data) => {
          setUser(data.user);
          // console.log(data.user.projects)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userSlug]);

  // console.log(me)
  // console.log(user?.projects)
  return (
    <div className="w-screen h-screen flex flex-col gap-15 p-6">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">My Portfolio</h1>
      <div className="flex gap-6">
        <div className="w-1/3">
          <Card>
            <p>{user?.firstname}</p>
            <p>{user?.lastname}</p>
            <p>{user?.email}</p>
            <p>{user?.bio}</p>
            <p>{user?.links}</p>
            </Card>
        </div>
        <div className="w-2/3">
          <TabsDemo projects={user?.projects}/>
        </div>
      </div>
    <div>
        { me ? (<p>This is me: {me.firstname}</p>) : '' }
        { user ? (<p>This is them: {user.firstname}</p>) : '' }
        <LogoutButton />
    </div>
  );
}
