import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import MovieStatistics from "../movie-statistics/Movie-statistics";
import styles from "./movie-summary.module.less";

export interface MovieSummaryProps {
  testId?: string;
}

const average = (arr: number[]) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function MovieSummary(props: MovieSummaryProps) {
  const { watched } = useMovieAppContext();
  const { testId } = props;

  const imdbRating = average(
    watched.map(({ imdbRating }) => Number(imdbRating))
  ).toFixed(1);

  const userRating = average(
    watched.map(({ userRating }) => Number(userRating))
  ).toFixed(1);

  const runtime = `${average(
    watched.map(({ Runtime }) => {
      const duration = Number(Runtime?.split(" ").at(0));
      return isNaN(duration) ? 0 : duration;
    })
  ).toFixed(1)} min`;
  ``;

  return (
    <div className={styles["movie-summary"]} data-testid={testId}>
      <h2 className={styles.title}>Movies you watched</h2>
      <div className={styles.statistics}>
        <MovieStatistics
          statistics={{
            imdbRating,
            userRating: Number(userRating),
            runtime,
            watchedMoviesNumber: `${watched.length} movies`,
          }}
        />
      </div>
    </div>
  );
}
