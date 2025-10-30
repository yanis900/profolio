import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export function SearchForm({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 w-full items-center"
    >
      <div className="flex w-full min-h-[42px] p-2 rounded-md bg-background border">
        <Input
          name="search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a name"
          className="flex-1 border-none shadow-none focus-visible:ring-0 min-w-[120px] p-0 h-auto"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={!searchQuery.trim()}
        className="flex gap-2 items-center min-h-[42px] bg-[#FFD300] text-[#0A2243] hover:bg-[#0A2243] hover:text-[#FFD300]"
      >
        <Search size={18} />
        Search
      </Button>
    </form>
  );
}
