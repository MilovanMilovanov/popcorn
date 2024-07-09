import { DragDropContext } from "react-beautiful-dnd";
import { useMovieAppContext } from "./context/movie-app-context/movie-app-context";

import NavBar from "./components/navbar/NavBar";
import Logo from "./components/logo/Logo";
import Search from "./components/search/Search";
import NumResults from "./components/num-results/Num-results";
import Switch from "./components/switch/Switch";
import MainContent from "./components/main-content/MainContent";
import MovieContainer from "./components/MovieContainer/MovieContainer";
import Loader from "./components/loader/Loader";
import ErrorMessage from "./components/error/Error";
import PromptMessage from "./components/prompt-message/Prompt-message";
import MovieList from "./components/movie-list/Movie-list";
import MovieDetails from "./components/movie-details/Movie-details";
import MovieSummary from "./components/movie-summary/Movie-summary";
import WatchedList from "./components/watched-list/Watched-list";
import DemoGif from "./components/demo-gif/DemoGif";

export default function App() {
  const { boxOrder, query, isLoading, error, selectedId, handleDragEnd } =
    useMovieAppContext();

  return (
    <>
      <NavBar>
        <Logo />
        <Search>
          <NumResults />
        </Search>
        <Switch />
      </NavBar>
      <DragDropContext onDragEnd={handleDragEnd}>
        <MainContent>
          {boxOrder.map(({ id }, index) =>
            id === "movieList" ? (
              <MovieContainer key={id} id={id} index={index}>
                {query.length < 3 && (
                  <>
                    <PromptMessage>
                      <span>Enter a movie title</span>
                    </PromptMessage>
                    <DemoGif width={100} />
                  </>
                )}
                {isLoading && (
                  <Loader>
                    <span>Loading movies...</span>
                  </Loader>
                )}
                {!isLoading && !error && <MovieList />}
                {error && <ErrorMessage error={error} />}
              </MovieContainer>
            ) : (
              <MovieContainer key={id} id={id} index={index}>
                {selectedId ? (
                  <MovieDetails />
                ) : (
                  <>
                    <MovieSummary />
                    <WatchedList />
                  </>
                )}
              </MovieContainer>
            )
          )}
        </MainContent>
      </DragDropContext>
    </>
  );
}
