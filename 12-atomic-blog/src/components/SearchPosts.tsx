import {useSearch} from "../methods/SearchContext";

export function SearchPosts() {
  const context = useSearch();

  const {searchQuery, setSearchQuery} = context;
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}
