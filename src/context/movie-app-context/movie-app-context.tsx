import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useFetchMovies from "../../hooks/useFetchMovies/useFetchMovies";
import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage";
import useTheme from "../../hooks/useTheme/useTheme";
import { DropResult } from "react-beautiful-dnd";
import { MovieProps } from "../../components/movie/Movie";

type BoxId = "movieList" | "watchedList";

interface MovieAppState {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  selectedId: string | null;
  setSelectedId: Dispatch<React.SetStateAction<string | null>>;
  movies: MovieProps[];
  isLoading: boolean;
  error: string | null;
  watched: MovieProps[];
  setWatched: Dispatch<React.SetStateAction<MovieProps[]>>;
  theme: string;
  handleThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isBoxOrderChanged: boolean;
  setIsBoxOrderChanged: Dispatch<React.SetStateAction<boolean>>;
  boxOrder: { id: BoxId }[];
  setBoxOrder: Dispatch<React.SetStateAction<{ id: BoxId }[]>>;
  handleRemoveMovie: (id: string | undefined) => void;
  handleUpdateWatchedlist: (movie: MovieProps) => void;
  handleSearch: (e?: ChangeEvent<HTMLInputElement>) => void;
  handleDragEnd: (result: DropResult) => void;
  handleCloseDetails: () => void;
  handleSelectedId: (id: string | null) => void;
}

export const initialState: MovieAppState = {
  query: "",
  setQuery: () => {},
  selectedId: null,
  setSelectedId: () => {},
  movies: [],
  watched: [],
  isLoading: false,
  error: null,
  setWatched: () => {},
  theme: "dark",
  handleThemeChange: () => {},
  isBoxOrderChanged: false,
  setIsBoxOrderChanged: () => {},
  boxOrder: [{ id: "movieList" }, { id: "watchedList" }],
  setBoxOrder: () => {},
  handleRemoveMovie: () => {},
  handleUpdateWatchedlist: () => {},
  handleSearch: () => {},
  handleDragEnd: () => {},
  handleCloseDetails: () => {},
  handleSelectedId: () => {},
};

const MovieAppContext = createContext<MovieAppState>(initialState);

const reorder = (
  list: { id: BoxId }[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function MovieAppProvider({
  contextValue,
  children,
}: {
  contextValue?: MovieAppState;
  children: ReactNode;
}) {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useFetchMovies(query);
  const [watched, setWatched] = useLocalStorage<[]>([], "watched");
  const [theme, handleThemeChange] = useTheme("dark");
  const [isBoxOrderChanged, setIsBoxOrderChanged] = useState<boolean>(false);
  const [boxOrder, setBoxOrder] = useState<MovieAppState["boxOrder"]>([
    { id: "movieList" },
    { id: "watchedList" },
  ]);

  const handleSelectedId = (id: string | null) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleCloseDetails = useCallback(() => {
    setSelectedId(null);
  }, [setSelectedId]);

  const handleRemoveMovie = (id: string | undefined) => {
    setWatched((watched: MovieProps[]) =>
      watched.filter((movie) => movie.imdbID !== id)
    );
  };

  const handleUpdateWatchedlist = (movie: MovieProps) => {
    setWatched((prev: MovieProps[]) => [...prev, movie]);
    setSelectedId(null);
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
  }, [handleCloseDetails]);

  const state: MovieAppState = {
    theme,
    query,
    setQuery,
    selectedId,
    setSelectedId,
    isBoxOrderChanged,
    setIsBoxOrderChanged,
    boxOrder,
    movies,
    isLoading,
    error,
    watched,
    setWatched,
    handleCloseDetails,
    handleThemeChange,
    setBoxOrder,
    handleDragEnd,
    handleRemoveMovie,
    handleSearch,
    handleUpdateWatchedlist,
    handleSelectedId,
  };

  return (
    <MovieAppContext.Provider
      value={contextValue ? { ...contextValue } : { ...state }}
    >
      {children}
    </MovieAppContext.Provider>
  );
}

export function useMovieAppContext() {
  return useContext(MovieAppContext);
}
