import {memo} from "react";
import type {Post} from "../type";

const ArchiveList = memo(function ArchiveList({
  post,
  handleClick,
}: {
  post: Post;
  handleClick: (post: Post) => void;
}) {
  return (
    <div>
      <li>
        <p>
          <strong>{post.title}:</strong> {post.body}
        </p>
        <button onClick={() => handleClick(post)}>Add as new post</button>
      </li>
    </div>
  );
});

export default ArchiveList;
