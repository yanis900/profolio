import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByName } from "../../services/user";
import { getProjectByTags } from "../../services/projects";
import { SearchForm } from "../../components/SearchForm";
import BackButton from "../../components/BackButton";
import LogoutButton from "../../components/LogoutButton";
import { PublicNavbar } from "../../components/PublicNavbar";
import { UserSearchResults } from "../../components/UserSearchResults";
import { ProjectSearchResults } from "../../components/ProjectSearchResults";
import { SimpleTagsInput } from "../../components/SimpleTagsInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchPage() {
  const [results, setResults] = useState([]);
  const [tagResults, setTagResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [selectedTags, setSelectedTags] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      setTagResults([]);
      setSelectedTags([])
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [query]);

  useEffect(() => {
    if (searchType === "tags") {
      setResults([]);
      setSearchQuery('')
      navigate("/search");
      getProjectByTags(selectedTags)
        .then((data) => {
          console.log(data.projects);
          setTagResults(data.projects);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedTags, searchType, navigate]);

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

          <div className="flex items-center justify-between mt-20">
            <BackButton />
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
              Search
            </h2>
            {isLoggedIn && <LogoutButton />}
          </div>

          <div className="flex justify-center gap-2">
            <Select onValueChange={setSearchType}>
              <SelectTrigger className="w-[180px] min-h-[42px]">
                <SelectValue placeholder="Search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Search By</SelectLabel> */}
                  <SelectItem value="tags">Projects by tags</SelectItem>
                  <SelectItem value="name">Users by name</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {searchType === "tags" ? (
              <SimpleTagsInput
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            ) : (
              ""
            )}
            {searchType === "name" ? (
              <SearchForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />
            ) : (
              ""
            )}
            {/* <ProjectSearch */}
          </div>
          {searchType === "tags" && <ProjectSearchResults results={tagResults} 
           />}
          {/* Results Section */}
          {query && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-muted-foreground">
                Search Results for &quot;{query}&quot;
              </h3>
              <UserSearchResults
                results={results}
                handleUserClick={handleUserClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
