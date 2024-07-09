import { ReactNode, RefObject } from "react";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import styles from "./movie.module.less";

export interface MovieProps {
  Poster?: string;
  Title?: string;
  Type?: string;
  Year?: string;
  Plot?: string;
  Released?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
  Runtime?: string;
  imdbID?: string;
  imdbRating?: string;
  userRating?: string | null;
}

export interface ExtendedMovieProps extends MovieProps {
  movie: MovieProps;
  children: ReactNode;
  movieRef?: RefObject<HTMLUListElement>;
  getFocusedElementIndex?: (ref: HTMLUListElement) => [HTMLElement[], number];
  testId?: string;
}

export default function Movie(props: ExtendedMovieProps) {
  const { handleSelectedId } = useMovieAppContext();
  const { movie, movieRef, testId, getFocusedElementIndex, children } = props;
  const { Poster: poster, Title: title, imdbID } = movie;

  function onBlur() {
    if (movieRef?.current && getFocusedElementIndex) {
      const [list, focusedIndex] = getFocusedElementIndex(movieRef.current);
      list[focusedIndex]?.blur();
    }
  }

  return (
    <li
      className={styles["movie-container"]}
      tabIndex={0}
      role="button"
      data-testid={testId}
      onClick={() => {
        handleSelectedId(imdbID!);
        onBlur();
      }}
      onBlur={onBlur}
    >
      <img
        className={styles["poster-img"]}
        src={poster}
        alt={`${title} poster`}
      />
      <h3 className={styles["movie-title"]}>{title}</h3>
      {children}
    </li>
  );
}
