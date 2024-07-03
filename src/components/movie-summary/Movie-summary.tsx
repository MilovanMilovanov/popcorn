import { MovieComponentProps, MovieDetailsProps } from "../movie/Movie";
import MovieStatistics, {
  StatisticProps,
} from "../movie-statistics/Movie-statistics";
import styles from "./movie-summary.module.less";

const average = (arr: number[]) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function MovieSummary(
  props: MovieComponentProps<MovieDetailsProps>
): JSX.Element {
  const { watched, testId } = props;

  const imdbRating = average(
    watched!.map((movie) => Number(movie.imdbRating))
  ).toFixed(1);
  const userRating = average(
    watched!.map((movie) => Number(movie.userRating))
  ).toFixed(1);
  const Runtime = `${average(
    watched!.map((movie: MovieDetailsProps) => {
      const duration = Number(movie.Runtime?.split(" ").at(0));
      return isNaN(duration) ? 0 : duration;
    })
  ).toFixed(1)} min`;
  ``;

  const statistics: StatisticProps = {
    watchedMoviesNumber: `${watched?.length} movies`,
    imdbRating,
    userRating,
    runtime: Runtime,
  };

  return (
    <div className={styles["movie-summary"]} data-testid={testId}>
      <h2 className={styles.title}>Movies you watched</h2>
      <div className={styles.statistics}>
        <MovieStatistics statistics={statistics} />
      </div>
    </div>
  );
}
