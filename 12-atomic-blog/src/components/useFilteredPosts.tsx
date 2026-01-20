import {useMemo} from "react";
import {useSearch} from "../methods/SearchContext";
import {usePosts} from "../methods/PostContext";
import type {Post} from "../type";

export function useFilteredPosts() {
  const {posts} = usePosts();
  const {searchQuery} = useSearch();

  return useMemo(() => {
    if (!searchQuery.trim()) return posts;

    return posts.filter((post: Post) =>
      `${post.title} ${post.body}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);
}
