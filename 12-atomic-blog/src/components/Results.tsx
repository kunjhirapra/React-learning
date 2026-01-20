import {usePosts} from "../methods/PostContext";

export function Results() {
  const context = usePosts();

  const {posts} = context;
  return <p>🚀 {posts.length} atomic posts found</p>;
}
