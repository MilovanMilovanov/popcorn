/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useFetchMovies from "./hooks/useFetchMovies/useFetchMovies";
import useLocalStorage from "./hooks/useLocalStorage/useLocalStorage";
import Box from "./components/box/box";
import Loading from "./components/loading/loading";
import Logo from "./components/logo/logo";
import ErrorMessage from "./components/error/error";
import GenericMessage from "./components/generic-text/generic-text";
import MovieDetails from "./components/movie-details/movie-details";
import MovieList from "./components/movie-list/movie-list";
import MovieSummary from "./components/movie-summary/movie-summary";
import Navigation from "./components/navigation/navigation";
import NumResults from "./components/num-results/num-results";
import Search from "./components/search/search";
import WatchedList from "./components/watchlist/watchlist";
import Main from "./components/main/main";
import { MovieDetailsProps } from "./components/movie/movie";
import Switch from "./components/switch/switch";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
          {query.length < 3 && <GenericMessage text="Enter a movie title" />}
          {isLoading && <Loading />}
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
          <Logo isMovieLoaded={Boolean(movies.length)} />
          <Search {...{ query, handleSearch }}>
            <NumResults num={movies.length} />
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
