import { RefObject, useRef } from "react";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import MovieStatistics from "../movie-statistics/Movie-statistics";
import useKey, { handleKeyPress } from "../../hooks/useKey/useKey";
import Movie, { MovieProps } from "../movie/Movie";
import styles from "./movie-list.module.less";

export interface MovieListProps {
  testId?: string;
}

export interface keyHandlerParamsProps {
  movies: MovieProps[];
  movieRef: RefObject<HTMLUListElement>;
  selectedId: string | null;
  isBoxOrderChanged?: boolean;
  getFocusedElementIndex?: (ref: HTMLUListElement) => [HTMLElement[], number];
  handleSelectedId: (id: string | null) => void;
}

interface KeyHandlersProps {
  [index: string]: (params: keyHandlerParamsProps) => void;
}

const getFocusedElementIndex = (ref: HTMLElement): [HTMLElement[], number] => {
  const list = Array.from(ref.querySelectorAll("li"));
  const focusedIndex = list.findIndex(
    (movie) => movie === document.activeElement
  );
  return [list, focusedIndex];
};

const keyHandlers: KeyHandlersProps = {
  ArrowUp: (params: keyHandlerParamsProps) => {
    const { movieRef } = params;

    if (movieRef?.current) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);
      const prevIndex = focusedIndex === 0 ? list.length - 1 : focusedIndex - 1;

      list[prevIndex]?.focus();
    }
  },

  ArrowDown: (params: keyHandlerParamsProps) => {
    const { movieRef } = params;

    if (movieRef?.current) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);
      const nextIndex = focusedIndex === list.length - 1 ? 0 : focusedIndex + 1;
      list[nextIndex]?.focus();
    }
  },

  ArrowLeft: (params: keyHandlerParamsProps) => {
    params.isBoxOrderChanged
      ? arrowLeftAndRightKeyHandlers.arrowRight(params)
      : arrowLeftAndRightKeyHandlers.arrowLeft(params);
  },

  ArrowRight: (params: keyHandlerParamsProps) => {
    params.isBoxOrderChanged
      ? arrowLeftAndRightKeyHandlers.arrowLeft(params)
      : arrowLeftAndRightKeyHandlers.arrowRight(params);
  },
};

const arrowLeftAndRightKeyHandlers = {
  arrowLeft: (params: keyHandlerParamsProps) => {
    const { movieRef, movies, selectedId, handleSelectedId } = params;

    if (movieRef?.current && movies) {
      const [list] = getFocusedElementIndex(movieRef.current);

      const lastFocused = movies.findIndex(
        (movie) => movie.imdbID === selectedId
      );

      if (lastFocused >= 0) {
        list[lastFocused]?.focus();
        handleSelectedId(null);
      }
    }
  },

  arrowRight: (params: keyHandlerParamsProps) => {
    const { movieRef, movies, handleSelectedId } = params;

    if (movieRef?.current && movies) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);

      if (focusedIndex >= 0) {
        list[focusedIndex].blur();
        handleSelectedId(movies[focusedIndex].imdbID!);
      }
    }
  },
};

export default function MovieList(props: MovieListProps) {
  const movieRef = useRef<HTMLUListElement>(null);
  const { movies, selectedId, isBoxOrderChanged, handleSelectedId } =
    useMovieAppContext();
  const { testId } = props;

  const keyHandlerParams = {
    movieRef,
    movies,
    selectedId,
    handleSelectedId,
    isBoxOrderChanged,
  };

  useKey((key) => {
    handleKeyPress(keyHandlerParams, keyHandlers[key]);
  });

  return (
    <ul ref={movieRef} className={styles["movie-list"]} data-testid={testId}>
      {movies.map((movie) => {
        const { Year: year, imdbID } = movie;

        return (
          <Movie
            key={imdbID}
            {...{
              movie,
              movieRef,
              getFocusedElementIndex,
              testId: undefined,
            }}
          >
            <MovieStatistics statistics={{ year }} />
          </Movie>
        );
      })}
    </ul>
  );
}
