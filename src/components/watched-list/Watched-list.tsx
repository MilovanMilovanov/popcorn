import Button from "../button/Button";
import Movie, { MovieDetailsProps, MovieComponentProps } from "../movie/Movie";
import MovieStatistics, {
  StatisticProps,
} from "../movie-statistics/Movie-statistics";
import styles from "./watched-list.module.less";

export default function WatchedList(
  props: MovieComponentProps<MovieDetailsProps>
): JSX.Element {
  const { watched, testId, handleRemoveMovie } = props;

  return (
    <ul className={styles["watched-list"]} data-testid={testId}>
      {watched!.map((movie) => {
        const { Runtime, userRating, imdbRating } = movie;

        const statistics = {
          imdbRating,
          userRating,
          runtime: Runtime,
        } as StatisticProps;

        return (
          <Movie key={movie.imdbID} {...{ ...props, testId: undefined, movie }}>
            <div style={{ display: "flex" }}>
              <MovieStatistics statistics={statistics} />
              <Button
                className={styles["btn-delete"]}
                onClick={() => handleRemoveMovie?.(movie.imdbID)}
              >
                –
              </Button>
            </div>
          </Movie>
        );
      })}
    </ul>
  );
}
