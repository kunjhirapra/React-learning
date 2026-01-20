import {memo, useState, useCallback} from "react";
import {createRandomPost} from "../App-memo";
import ArchiveList from "./ArchiveList";
import type {Post} from "../type";

const Archive = memo(function Archive({
  show,
  onAddPost,
}: {
  show: boolean;
  onAddPost: (post: Post) => void;
}) {
  const [archivePost] = useState<Post[]>(() =>
    Array.from({length: 10000}, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(show);

  const handleAddPost = useCallback(
    (post: Post) => {
      onAddPost(post);
    },
    [onAddPost]
  );

  return (
    <aside>
      <h2>Post archive</h2>

      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive" : "Show archive"}
      </button>

      {showArchive && (
        <ul>
          {archivePost.map((post: Post) => (
            <ArchiveList
              key={post.id}
              post={post}
              handleClick={handleAddPost}
            />
          ))}
        </ul>
      )}
    </aside>
  );
});

export {Archive};
