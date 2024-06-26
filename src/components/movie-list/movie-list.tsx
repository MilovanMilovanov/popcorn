import { useRef } from "react";
import Movie, { MovieComponentProps } from "../movie/Movie";
import "./movie-list.less";
import useKey, { handleKeyPress } from "../../hooks/useKey/useKey";

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
    handleKeyPress(key, keyHandlerParams, keyHandlers[key]);
  });

  return (
    <ul ref={movieRef} className="list list-movies" data-testid={testId}>
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          {...{
            ...{ ...props, testId: undefined },
            movie,
            getFocusedElementIndex,
            movieRef,
          }}
        >
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </Movie>
      ))}
    </ul>
  );
}
