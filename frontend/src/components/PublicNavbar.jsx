import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SignupButton from "./SignupButton";
import FindProfileButton from "./FindProfileButton";
import LoginButton from "./LoginButton";
import MyPortfolioButton from "./MyPortfolioButton";
import LogoutButton from "./LogoutButton";
import { getUserById } from "../services/user";

export function PublicNavbar() {
  const location = useLocation();
  const [me, setMe] = useState(null);

  // Refresh auth function
  const refreshAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserById(token)
        .then((data) => setMe(data.user))
        .catch(() => setMe(null));
    } else {
      setMe(null);
    }
  };

  useEffect(() => {
    refreshAuth(); // check once on mount

    // Listen for login/logout events
    window.addEventListener("authChange", refreshAuth);
    return () => window.removeEventListener("authChange", refreshAuth);
  }, []);

  const isLoggedIn = !!me;

  const isPortfolioPage = location.pathname.includes("/portfolio");
  const isSearchPage = location.pathname.includes("/search");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full shadow-md border-b"
      style={{
        backgroundColor: "#fdfdf9",
        borderBottomColor: "#EAF0D4",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-[#4DBCDB] hover:opacity-80 transition-all duration-300"
        >
          <span className="font-bold text-2xl tracking-tight drop-shadow-sm hover:scale-105 transition-transform duration-200">
            Profolio
          </span>
        </a>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {!isSearchPage && <FindProfileButton />}
          {!isLoggedIn && (
            <>
              <SignupButton />
              <LoginButton />
            </>
          )}
          {isLoggedIn && !isPortfolioPage && <MyPortfolioButton />}
          {isLoggedIn && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}



// import { useEffect, useState } from "react";
// import SignupButton from "./SignupButton";
// import FindProfileButton from "./FindProfileButton";
// import LoginButton from "./LoginButton";
// import MyPortfolioButton from "./MyPortfolioButton";
// import LogoutButton from "./LogoutButton";
// import { getUserById } from "../services/user";

// export function PublicNavbar() {
//   const [me, setMe] = useState(null);
//   const [token, setToken] = useState(null);

//   // Check login state and load current user
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);

//     if (storedToken) {
//       getUserById(storedToken)
//         .then((data) => setMe(data.user))
//         .catch((err) => console.error("Failed to fetch user:", err));
//     }
//   }, []);

//   const isLoggedIn = !!token;
//   const isOwner = !!me; // if we have user data, it's the logged-in user

//   return (
//     <nav
//       className="fixed top-0 left-0 right-0 z-50 w-full shadow-md border-b"
//       style={{
//         backgroundColor: "#fdfdf9",
//         borderBottomColor: "#EAF0D4",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <a
//           href="/"
//           className="flex items-center gap-2 text-[#4DBCDB] hover:opacity-80 transition-all duration-300"
//         >
//           <span className="font-bold text-2xl tracking-tight drop-shadow-sm hover:scale-105 transition-transform duration-200">
//             Profolio
//           </span>
//         </a>

//         {/* Buttons */}
//         <div className="flex items-center gap-3">
//           <FindProfileButton />

//           {!isLoggedIn && (
//             <>
//               <SignupButton />
//               <LoginButton />
//             </>
//           )}

//           {isLoggedIn && (
//             <>
//               <MyPortfolioButton />
//               <LogoutButton />
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



// import SignupButton from "./SignupButton";
// import FindProfileButton from "./FindProfileButton";
// import LoginButton from "./LoginButton";
// import MyPortfolioButton from "./MyPortfolioButton";
// import { useEffect, useState } from "react";

// export function PublicNavbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check login status (you can adapt this to your actual auth logic)
//     const token = localStorage.getItem("authToken");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <nav
//       className="fixed top-0 left-0 right-0 z-50 w-full shadow-md border-b"
//       style={{
//         backgroundColor: "#fdfdf9",
//         borderBottomColor: "#EAF0D4",
//         backdropFilter: "blur(12px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <a
//           href="/"
//           className="flex items-center gap-2 text-[#4DBCDB] hover:opacity-80 transition-all duration-300"
//         >
//           {/* <img src={logo} alt="Profolio" className="h-10 w-10" /> */}
//           <span className="font-bold text-2xl tracking-tight drop-shadow-sm">
//             Profolio
//           </span>
//         </a>

//         {/* Buttons */}
//         <div className="flex items-center gap-3">
//           <FindProfileButton />

//           {!isLoggedIn && (
//             <>
//               <SignupButton />
//               <LoginButton />
//             </>
//           )}

//           {isLoggedIn && <MyPortfolioButton />}
//         </div>
//       </div>
//     </nav>
//   );
// }
