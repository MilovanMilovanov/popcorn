import { ReactNode, RefObject } from "react";
import styles from "./movie.module.less";

export interface MovieDetailsProps {
  Poster?: string;
  Title?: string;
  Type?: string;
  Year?: string;
  imdbID?: string;
  Runtime?: string;
  imdbRating?: string;
  userRating?: number | string | null;
  Plot?: string;
  Released?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
}

export interface MovieComponentProps<MovieProps = MovieDetailsProps> {
  movie?: MovieProps;
  movies?: MovieProps[];
  watched?: MovieProps[] | [];
  movieRef?: RefObject<HTMLUListElement>;
  selectedId?: string | null;
  isBoxOrderChanged?: boolean;
  testId?: string;
  getFocusedElementIndex?: (ref: HTMLUListElement) => [HTMLElement[], number];
  handleSelectedId?: (id: string | null) => void;
  handleRemoveMovie?: (id: string | undefined) => void;
  children?: ReactNode;
}

export default function Movie(
  props: MovieComponentProps<MovieDetailsProps>
): JSX.Element {
  const {
    movie,
    movieRef,
    testId,
    handleSelectedId,
    getFocusedElementIndex,
    children,
  } = props;

  const { Poster, Title, imdbID } = movie!;

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
        handleSelectedId?.(imdbID!);
        onBlur();
      }}
      onBlur={onBlur}
    >
      <img
        className={styles["poster-img"]}
        src={Poster}
        alt={`${Title} poster`}
      />
      <h3 className={styles["movie-title"]}>{Title}</h3>
      {children}
    </li>
  );
}
