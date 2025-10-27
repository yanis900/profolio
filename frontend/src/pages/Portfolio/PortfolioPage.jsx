import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import {
  getGithubContributions,
  getUserById,
  getUserBySlug,
} from "../../services/user";
import { TabsDemo } from "@/components/TabsDemo";
import BackButton from "@/components/BackButton";
import { UserView } from "@/components/UserView";
import { UserBadge} from "@/components/UserBadge";
import { updateViewCount } from "@/services/analytics";
import { getViewCount } from "@/services/analytics";


export function PortfolioPage() {
  const { userSlug } = useParams();
  const [me, setMe] = useState(null);
  const [user, setUser] = useState(null);
  const [views, setViews] = useState(null);
  const [contributions, setContributions] = useState(null)
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;

    getUserBySlug(userSlug)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.error(err);
      });

    if (loggedIn) {
      getUserById(token)
        .then((data) => {
          setMe(data.user);
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

  useEffect(() => {
    if (user && user.github) {
      getGithubContributions(user.github)
        .then((data) => {
          setContributions(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  async function refreshUser() {
    const data = await getUserBySlug(userSlug);
    setUser(data.user);
  }

  // Check if the logged-in user is viewing their own portfolio
  const isOwner = me?._id === user?._id;

  return (
    <div className="w-screen h-screen flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <h2 className="scroll-m-20 text-center text-3xl font-bold tracking-tight text-balance">
          {isOwner ? "My Portfolio" : `${user?.firstname}'s Portfolio`}
        </h2>

        <LogoutButton />
      </div>
      <div className="flex gap-6">
        <div className="w-1/3">
          {/* <UserView user={user} refreshUser={refreshUser} isOwner={isOwner} contributions={contributions} {token && <UserBadge token={token} />} /> */}
          <UserView
            user={user}
            refreshUser={refreshUser}
            isOwner={isOwner}
            contributions={contributions}
          >
            <UserBadge token={token} />
          </UserView>
        </div>
        <div className="w-2/3">
          <TabsDemo
            user={user}
            projects={user?.projects}
            views={views}
            refreshUser={refreshUser}
            isOwner={isOwner}
          />
        </div>
      </div>
    </div>
  );
}
