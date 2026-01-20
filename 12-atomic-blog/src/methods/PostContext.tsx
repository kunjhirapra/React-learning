import React, {createContext, useContext, useState, useCallback} from "react";
import {createRandomPost} from "../App-memo";
import type {Post} from "../type";

type PostsContextType = {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onClearPosts: () => void;
};

const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider = ({children}: {children: React.ReactNode}) => {
  const [posts, setPosts] = useState<Post[]>(() =>
    Array.from({length: 30}, () => createRandomPost())
  );

  const onAddPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const onClearPosts = useCallback(() => {
    setPosts([]);
  }, []);

  return (
    <PostsContext.Provider value={{posts, onAddPost, onClearPosts}}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
};
