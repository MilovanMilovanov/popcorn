import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useFetchMovies from "./hooks/useFetchMovies/useFetchMovies";
import useLocalStorage from "./hooks/useLocalStorage/useLocalStorage";
import Box from "./components/box/Box";
import Logo from "./components/logo/Logo";
import ErrorMessage from "./components/error/Error";
import GenericMessage from "./components/generic-text/Generic-text";
import MovieDetails from "./components/movie-details/Movie-details";
import MovieList from "./components/movie-list/Movie-list";
import MovieSummary from "./components/movie-summary/Movie-summary";
import Navigation from "./components/navigation/Navigation";
import NumResults from "./components/num-results/Num-results";
import Search from "./components/search/Search";
import WatchedList from "./components/watchlist/Watchlist";
import Main from "./components/main/Main";
import { MovieDetailsProps } from "./components/movie/Movie";
import Switch from "./components/switch/Switch";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Loader from "./components/loading/Loading";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useFetchMovies(query);
  const [watched, setWatched] = useLocalStorage<[]>([], "watched");
  const [isBoxOrderChanged, setIsBoxOrderChanged] = useState<boolean>(false);

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
    const dest = result.destination;
    if (!dest) return;

    setIsBoxOrderChanged((prev) => !prev);
  };

  useEffect(() => {
    handleCloseDetails();
  }, [movies, handleCloseDetails]);

  const boxOrder = [
    {
      id: "movieList",
      content: (index: number) => (
        <Box id="movieList" key="movieList" index={index}>
          {query.length < 3 && (
            <GenericMessage>
              <span>Enter a movie title</span>
            </GenericMessage>
          )}
          {isLoading && (
            <Loader>
              <span>Loading movies...</span>
            </Loader>
          )}
          {!isLoading && !error && (
            <MovieList
              {...{ movies, selectedId, handleSelectedId, isBoxOrderChanged }}
            />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
      ),
    },
    {
      id: "watchlist",
      content: (index: number) => (
        <Box id="watchlist" key="watchlist" index={index}>
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
        </Box>
      ),
    },
  ];

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Navigation>
          <Logo isMovieLoaded={Boolean(movies.length)}>
            <img src="src\assets\popcorn.jpg" alt="animated popcorn image" />
            <h1>usePopcorn</h1>
          </Logo>
          <Search {...{ query, handleSearch }}>
            <NumResults numberOfResults={movies.length} />
          </Search>
          <Switch />
        </Navigation>
        <Main>
          {(isBoxOrderChanged ? boxOrder.reverse() : boxOrder).map(
            (box, index) => box.content(index)
          )}
        </Main>
      </DragDropContext>
    </>
  );
}
