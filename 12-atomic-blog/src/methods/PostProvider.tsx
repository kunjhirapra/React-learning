import {PostsProvider} from "./PostContext";
import {SearchProvider} from "./SearchContext";

export const PostProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SearchProvider>
      <PostsProvider>{children}</PostsProvider>
    </SearchProvider>
  );
};
