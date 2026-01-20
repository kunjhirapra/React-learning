import {memo} from "react";
import {PostItem} from "./PostItem";
import {useFilteredPosts} from "./useFilteredPosts";
import type {Post} from "../type";

export const Posts = memo(function Posts() {
  const posts = useFilteredPosts();

  return (
    <ul>
      {posts.map((post: Post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
});
