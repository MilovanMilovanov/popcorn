import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { MovieDetailsProps } from "./components/movie/Movie";
import useFetchMovies from "./hooks/useFetchMovies/useFetchMovies";
import useLocalStorage from "./hooks/useLocalStorage/useLocalStorage";
import Logo from "./components/logo/Logo";
import MovieContainer from "./components/MovieContainer/MovieContainer";
import ErrorMessage from "./components/error/Error";
import PromptMessage from "./components/prompt-message/Prompt-message";
import MovieDetails from "./components/movie-details/Movie-details";
import MovieList from "./components/movie-list/Movie-list";
import MovieSummary from "./components/movie-summary/Movie-summary";
import NavBar from "./components/navbar/NavBar";
import NumResults from "./components/num-results/Num-results";
import Search from "./components/search/Search";
import WatchedList from "./components/watched-list/Watched-list";
import MainContent from "./components/main-content/MainContent";
import Switch from "./components/switch/Switch";
import Loader from "./components/loader/Loader";
import popcornDarkDemo from "./assets/popcorn-dark-demo.gif";
import popcornLightDemo from "./assets/popcorn-light-demo.gif";
import useTheme from "./hooks/useTheme/useTheme";

const reorder = (
  list: { id: string }[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useFetchMovies(query);
  const [watched, setWatched] = useLocalStorage<[]>([], "watched");
  const [theme, handleChange] = useTheme("dark");
  const [isBoxOrderChanged, setIsBoxOrderChanged] = useState<boolean>(false);
  const [boxOrder, setBoxOrder] = useState([
    { id: "movieList" },
    { id: "watchedlist" },
  ]);

  const handleSelectedId = useCallback(
    (id: string | null) => {
      setSelectedId(selectedId === id ? null : id);
    },
    [selectedId]
  );

  const handleCloseDetails = useCallback(() => {
    setSelectedId(null);
  }, [setSelectedId]);

  const handleRemoveMovie = (id: string | undefined) => {
    setWatched((watched: MovieDetailsProps[]) =>
      watched.filter((movie) => movie.imdbID !== id)
    );
  };

  const handleUpdateWatchlist = <M extends MovieDetailsProps>(movie: M) => {
    setWatched((prev: M[]) => [...prev, movie]);
    handleSelectedId(null);
  };

  const handleSearch = (e?: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value || "";
    setQuery(value);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) {
      return;
    }

    const newState = reorder(boxOrder, source.index, destination.index);

    setBoxOrder(newState);
    setIsBoxOrderChanged((prev) => !prev);
  };

  useEffect(() => {
    handleCloseDetails();
  }, [movies, handleCloseDetails]);

  return (
    <>
      <NavBar>
        <Logo isMovieLoaded={Boolean(movies.length)} />
        <Search {...{ query, handleSearch }}>
          <NumResults numberOfResults={movies.length} />
        </Search>
        <Switch {...{ theme, handleChange }} />
      </NavBar>
      <DragDropContext onDragEnd={handleDragEnd}>
        <MainContent>
          {boxOrder.map((data, index) => {
            if (data.id === "movieList") {
              return (
                <MovieContainer key={data.id} id={data.id} index={index}>
                  {query.length < 3 && (
                    <>
                      <PromptMessage>
                        <span>Enter a movie title</span>
                      </PromptMessage>
                      <img
                        className="popcorn-demo"
                        src={
                          theme === "dark" ? popcornLightDemo : popcornDarkDemo
                        }
                        alt="popcorn demo gif"
                        width="100%"
                      />
                    </>
                  )}
                  {isLoading && (
                    <Loader>
                      <span>Loading movies...</span>
                    </Loader>
                  )}
                  {!isLoading && !error && (
                    <MovieList
                      {...{
                        movies,
                        selectedId,
                        handleSelectedId,
                        isBoxOrderChanged,
                      }}
                    />
                  )}
                  {error && <ErrorMessage error={error} />}
                </MovieContainer>
              );
            } else {
              return (
                <MovieContainer key={data.id} id={data.id} index={index}>
                  {selectedId ? (
                    <MovieDetails
                      {...{
                        watched,
                        selectedId,
                        handleUpdateWatchlist,
                        handleCloseDetails,
                      }}
                    />
                  ) : (
                    <>
                      <MovieSummary watched={watched} />
                      <WatchedList {...{ watched, handleRemoveMovie }} />
                    </>
                  )}
                </MovieContainer>
              );
            }
          })}
        </MainContent>
      </DragDropContext>
    </>
  );
}
