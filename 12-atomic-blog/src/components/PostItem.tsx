import type {Post} from "../type";
import {memo} from "react";

export const PostItem = memo(function PostItem({post}: {post: Post}) {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </li>
  );
});
