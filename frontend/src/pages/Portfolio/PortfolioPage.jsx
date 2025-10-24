import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { getUserById, getUserBySlug } from "../../services/user";
import { TabsDemo } from "@/components/TabsDemo";
import BackButton from "@/components/BackButton";
import { UserView } from "@/components/UserView";
import { updateViewCount } from "@/services/analytics";
import { getViewCount } from "@/services/analytics";

export function PortfolioPage() {
  const { userSlug } = useParams();
  const [me, setMe] = useState(null);
  const [user, setUser] = useState(null);
  const [views, setViews] = useState(null)

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
        })
        .catch((err) => {
          console.error(err);
        });  
      updateViewCount(token, userSlug)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
      getViewCount(token, userSlug)
        .then((data) => {
          setViews(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userSlug]);

  async function refreshUser() {
    const token = localStorage.getItem("token");
    const data = await getUserBySlug(token, userSlug);
    setUser(data.user);
  }

  console.log(me);
  return (
    <div className="w-screen h-screen flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <h2 className="scroll-m-20 text-center text-3xl font-bold tracking-tight text-balance">
          My Portfolio
        </h2>

        <LogoutButton />
      </div>
      <div className="flex gap-6">
        <div className="w-1/3">
          <UserView user={user} refreshUser={refreshUser}/>
        </div>
        <div className="w-2/3">
          <TabsDemo projects={user?.projects} views={views} refreshUser={refreshUser} />
        </div>
      </div>
    </div>
  );
}
