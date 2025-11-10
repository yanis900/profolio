import { Card, CardContent } from "@/components/ui/card";
import { PublicNavbar } from "../../components/PublicNavbar";
import { Hero } from "@/components/Hero";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user";

export function HomePage() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserById(token)
        .then((data) => setMe(data.user))
        .catch(() => setMe(null));
    } else {
      setMe(null);
    }
  }, []);

  const isLoggedIn = !!me;
  return (
    <>
      <PublicNavbar />
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#FFFCEC]">
        {isLoggedIn ? "" : <Hero />}
        <section className="bg-base-100 p-6 py-16 bg-[#FFFCEC] w-screen">
          <div className="-mx-6 space-y-4 overflow-scroll px-6">
            {/* Row 1 */}
            <div className="-ml-2 flex items-center gap-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <Card key={index} className="group rounded-2xl bg-base-300 p-6">
                  <CardContent className="flex gap-4 p-0">
                    <span className="md:w-18 md:h-18 flex h-12 w-12 items-center justify-center rounded-full bg-base-100 duration-200 group-hover:-rotate-3">
                      <img
                        alt={`profile ${index + 1}`}
                        loading="lazy"
                        width="48"
                        height="48"
                        decoding="async"
                        className="md:w-18 md:h-18 h-12 w-12 rounded-full bg-base-100 object-cover"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${
                          index + 1
                        }`}
                      />
                    </span>
                    <div className="flex-1">
                      <p className="w-28 truncate font-bold duration-200 group-hover:underline">
                        User {index + 1}
                      </p>
                      <span className="badge whitespace-nowrap">
                        {Math.floor(Math.random() * 10) + 1} projects
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="-ml-24 flex items-center gap-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <Card key={index} className="group rounded-2xl bg-base-300 p-6">
                  <CardContent className="flex gap-4 p-0">
                    <span className="md:w-18 md:h-18 flex h-12 w-12 items-center justify-center rounded-full bg-base-100 duration-200 group-hover:-rotate-3">
                      <img
                        alt={`profile ${index + 1}`}
                        loading="lazy"
                        width="48"
                        height="48"
                        decoding="async"
                        className="md:w-18 md:h-18 h-12 w-12 rounded-full bg-base-100 object-cover"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${
                          index + 1
                        }`}
                      />
                    </span>
                    <div className="flex-1">
                      <p className="w-28 truncate font-bold duration-200 group-hover:underline">
                        User {index + 1}
                      </p>
                      <span className="badge whitespace-nowrap">
                        {Math.floor(Math.random() * 10) + 1} projects
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="ml-12 flex items-center gap-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <Card key={index} className="group rounded-2xl bg-base-300 p-6">
                  <CardContent className="flex gap-4 p-0">
                    <span className="md:w-18 md:h-18 flex h-12 w-12 items-center justify-center rounded-full bg-base-100 duration-200 group-hover:-rotate-3">
                      <img
                        alt={`profile ${index + 1}`}
                        loading="lazy"
                        width="48"
                        height="48"
                        decoding="async"
                        className="md:w-18 md:h-18 h-12 w-12 rounded-full bg-base-100 object-cover"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${
                          index + 1
                        }`}
                      />
                    </span>
                    <div className="flex-1">
                      <p className="w-28 truncate font-bold duration-200 group-hover:underline">
                        User {index + 1}
                      </p>
                      <span className="badge whitespace-nowrap">
                        {Math.floor(Math.random() * 10) + 1} projects
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
