import {faker} from "@faker-js/faker";
import {Header} from "./components/Header";
import {Main} from "./components/Main";
import {Archive} from "./components/Archive";
import {Footer} from "./components/Footer";
import LightDarkButton from "./components/LightDarkButton";
import {PostProvider} from "./methods/PostProvider";
import {usePosts} from "./methods/PostContext";

export function createRandomPost() {
  return {
    id: crypto.randomUUID(),
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function ArchiveWrapper() {
  const {onAddPost} = usePosts();
  return <Archive show={false} onAddPost={onAddPost} />;
}

function App() {
  return (
    <section>
      <LightDarkButton />
      <PostProvider>
        <Header />
        <Main />
        <ArchiveWrapper />
        <Footer />
      </PostProvider>
    </section>
  );
}

export default App;
