import { useEffect, useRef } from "react";
import styles from "./num-results.module.less";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";

export interface NumResultsProps {
  testId?: string;
}

export default function NumResults(props: NumResultsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { movies } = useMovieAppContext();
  const { testId } = props;

  const numberOfResults = movies.length;

  useEffect(() => {
    if (ref.current) {
      numberOfResults !== 0
        ? (ref.current.style.animationPlayState = "paused")
        : (ref.current.style.animationPlayState = "running");
    }
  }, [numberOfResults]);

  return (
    <div className={styles["num-results-container"]}>
      <span
        ref={ref}
        className={`${styles["num-results"]} ${styles["animate"]}`}
        data-testid={testId}
      >
        Found<pre> </pre>
        {numberOfResults ? (
          <>
            <strong className={styles.zoom}>{numberOfResults}</strong>
            <div className={styles["zoom-placeholder"]}>{numberOfResults}</div>
          </>
        ) : (
          <strong>{numberOfResults}</strong>
        )}
        <pre> </pre>
        results
      </span>
    </div>
  );
}
