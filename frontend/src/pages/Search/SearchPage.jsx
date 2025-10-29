import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByName } from "../../services/user";
import { SearchForm } from "../../components/SearchForm";
import BackButton from "../../components/BackButton";
import LogoutButton from "../../components/LogoutButton";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { capitalise } from "../../utils/capitalise";
import { MapPin } from "lucide-react";
import { PublicNavbar } from "../../components/PublicNavbar";

export function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [query]);

  async function fetchSearchResults(searchTerm) {
    setLoading(true);
    try {
      const data = await getUserByName(searchTerm);
      setResults(data?.users || []);
    } catch (error) {
      console.error("Error searching users:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  }

  function handleUserClick(user) {
    const slug = `${user.firstname}-${user.lastname}-${user._id.slice(-6)}`;
    navigate(`/portfolio/${slug}`);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <p className="ml-4">Searching...</p>
      </div>
    );
  }

  return (
    <>
    <PublicNavbar />
    <div className="home px-6 pt-15 pb-1"> </div> 
    <div className="w-screen min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <BackButton />
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
            Search Users
          </h2>
          {isLoggedIn && <LogoutButton />}
        </div>

        {/* Search Form */}
        <div className="flex justify-center">
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
        </div>

        {/* Results Section */}
        {query && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-muted-foreground">
              Search Results for "{query}"
            </h3>

            {results.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <p className="text-lg text-muted-foreground">
                    No users found matching your search.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try a different name or search term.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {results.map((user) => (
                  <Card
                    key={user._id}
                    className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500"
                    onClick={() => handleUserClick(user)}
                  >
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center gap-4">
                          {/* User Avatar */}
                          <img
                            src={user.image}
                            alt={`${user.firstname} ${user.lastname}`}
                            className="w-16 h-16 rounded-full border-2 border-purple-300"
                          />

                          {/* User Info */}
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold">
                              {capitalise(user.firstname)}{" "}
                              {capitalise(user.lastname)}
                            </h4>
                            {user.jobtitle && (
                              <p className="text-sm font-normal text-muted-foreground">
                                {capitalise(user.jobtitle)}
                              </p>
                            )}
                            <div className="flex gap-2 mt-2 items-center flex-wrap">
                              {user.opentowork && (
                                <Badge
                                  variant="outline"
                                  className="border-2 border-blue-500"
                                >
                                  Open to work
                                </Badge>
                              )}
                              {user.location && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin size={14} />
                                  {user.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    {user.bio && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {user.bio}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
