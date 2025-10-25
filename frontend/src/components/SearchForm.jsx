import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export function SearchForm({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="flex gap-3 w-full max-w-2xl">
      <Input
        name="search"
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for users by name..."
        className="border-2"
        required
      />
      <Button
        type="submit"
        disabled={!searchQuery.trim()}
        className="flex gap-2 items-center"
      >
        <Search size={18} />
        Search
      </Button>
    </form>
  );
}
