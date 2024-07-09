import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import styles from "./logo.module.less";

export interface LogoProps {
  testId?: string;
}

export default function Logo(props: LogoProps) {
  const { movies } = useMovieAppContext();
  const { testId } = props;
  return (
    <div data-testid={testId} className={styles["logo-container"]}>
      <img
        className={`${styles["logo-img"]} ${
          movies.length ? styles["logo-highlight"] : ""
        }`}
        src="src\assets\popcorn.jpg"
        alt="animated popcorn image"
      />
      <h1 className={styles.heading}>usePopcorn</h1>
    </div>
  );
}
