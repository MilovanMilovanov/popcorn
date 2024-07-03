import { useRef } from "react";
import useKey, { handleKeyPress } from "../../hooks/useKey/useKey";
import Movie, { MovieComponentProps } from "../movie/Movie";
import styles from "./movie-list.module.less";
import MovieStatistics from "../movie-statistics/Movie-statistics";

const getFocusedElementIndex = (ref: HTMLElement): [HTMLElement[], number] => {
  const list = Array.from(ref.querySelectorAll("li"));
  const focusedIndex = list.findIndex(
    (movie) => movie === document.activeElement
  );
  return [list, focusedIndex];
};

interface KeyHandlersProps {
  [index: string]: (params: MovieComponentProps) => void;
}

const keyHandlers: KeyHandlersProps = {
  ArrowUp: (params: MovieComponentProps) => {
    const { movieRef } = params;

    if (movieRef?.current) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);
      const prevIndex = focusedIndex === 0 ? list.length - 1 : focusedIndex - 1;

      list[prevIndex]?.focus();
    }
  },

  ArrowDown: (params: MovieComponentProps) => {
    const { movieRef } = params;

    if (movieRef?.current) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);
      const nextIndex = focusedIndex === list.length - 1 ? 0 : focusedIndex + 1;
      list[nextIndex]?.focus();
    }
  },

  ArrowLeft: (params: MovieComponentProps) => {
    params.isBoxOrderChanged
      ? arrowLeftAndRightKeyHandlers.arrowRight(params)
      : arrowLeftAndRightKeyHandlers.arrowLeft(params);
  },

  ArrowRight: (params: MovieComponentProps) => {
    params.isBoxOrderChanged
      ? arrowLeftAndRightKeyHandlers.arrowLeft(params)
      : arrowLeftAndRightKeyHandlers.arrowRight(params);
  },
};

const arrowLeftAndRightKeyHandlers = {
  arrowLeft: (params: MovieComponentProps) => {
    const { movieRef, movies, selectedId, handleSelectedId } = params;

    if (movieRef?.current && movies) {
      const [list] = getFocusedElementIndex(movieRef.current);

      const lastFocused = movies.findIndex(
        (movie) => movie.imdbID === selectedId
      );

      if (lastFocused >= 0) {
        list[lastFocused]?.focus();
        handleSelectedId?.(null);
      }
    }
  },

  arrowRight: (params: MovieComponentProps) => {
    const { movieRef, movies, handleSelectedId } = params;

    if (movieRef?.current && movies) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);
      if (focusedIndex >= 0) {
        list[focusedIndex].blur();
        handleSelectedId?.(movies[focusedIndex].imdbID ?? null);
      }
    }
  },
};

export default function MovieList(props: MovieComponentProps): JSX.Element {
  const movieRef = useRef<HTMLUListElement>(null);
  const { movies, selectedId, testId, isBoxOrderChanged, handleSelectedId } =
    props;

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
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          {...{
            ...props,
            testId: undefined,
            movie,
            getFocusedElementIndex,
            movieRef,
          }}
        >
          <MovieStatistics statistics={{ year: movie.Year }} />
        </Movie>
      ))}
    </ul>
  );
}
