export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface PostContextType {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
