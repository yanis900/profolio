import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGithubContributions,
  getUserById,
  getUserBySlug,
} from "../../services/user";
import { TabsDemo } from "@/components/TabsDemo";
import { UserView } from "@/components/UserView";
import { updateViewCount } from "@/services/analytics";
import { getViewCount } from "@/services/analytics";
import { getEmailCount } from "@/services/analytics";
import { PublicNavbar } from "../../components/PublicNavbar";

export function PortfolioPage() {
  const { userSlug } = useParams();
  const [me, setMe] = useState(null);
  const [user, setUser] = useState(null);
  const [views, setViews] = useState(null);
  const [contributions, setContributions] = useState(null);
  const [token, setToken] = useState(null);
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;

    if (token) {
      setToken(token);
    }

    getUserBySlug(userSlug)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.error(err);
      });
    updateViewCount(token, userSlug)
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

      getViewCount(token, userSlug)
        .then((data) => {
          setViews(data);
        })
        .catch((err) => {
          console.error(err);
        });
      getEmailCount(token, userSlug)
        .then((data) => {
          setEmails(data);
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
    <>
      <PublicNavbar />
      <div className="home px-6 pt-15 pb-1"> </div>
      <div className="w-screen min-h-screen flex flex-col gap-8 p-6 bg-[#FFFCEC]">
        <div className="flex items-center justify-between">
          <h2 className="text-center text-3xl font-bold tracking-tight text-balance mt-3 flex-1 text-[#0A2243] leading-tight">
            {isOwner ? "My Portfolio" : `${user?.firstname}'s Portfolio`}
          </h2>
        </div>
        <div className="flex gap-5">
          <div className="w-[31vw]">
            <UserView
              user={user}
              refreshUser={refreshUser}
              isOwner={isOwner}
              contributions={contributions}
              token={token}
            />
          </div>
          <div className="w-2/3">
            <TabsDemo
              user={user}
              projects={user?.projects}
              views={views}
              emails={emails}
              refreshUser={refreshUser}
              isOwner={isOwner}
            />
          </div>
        </div>
      </div>
    </>
  );
}
