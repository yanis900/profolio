import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton"

import { getUserById, getUserBySlug } from '../../services/user'

export function PortfolioPage() {
const { userSlug } = useParams();
const [me, setMe] = useState(undefined)
const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null
    if (loggedIn) {
        getUserById(token)
        .then((data) => {
            setMe(data.user)
        })
        .catch((err) => {
        console.error(err);
        })
        getUserBySlug(token, userSlug)
        .then((data) => {
            setUser(data.user)
        })
        .catch((err) => {
        console.error(err);
        })
    }
  }, [userSlug]);

  return (
    <div>
        { me ? (<p>This is me: {me.firstname}</p>) : '' }
        { user ? (<p>This is them: {user.firstname}</p>) : '' }
        <LogoutButton />
    </div>
  );
}
