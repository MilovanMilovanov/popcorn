import Button from "../button/Button";
import Movie from "../movie/Movie";
import MovieStatistics from "../movie-statistics/Movie-statistics";
import styles from "./watched-list.module.less";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";

interface WatchedList {
  testId?: string;
}

export default function WatchedList(props: WatchedList) {
  const { watched, handleRemoveMovie } = useMovieAppContext();
  const { testId } = props;

  return (
    <ul className={styles["watched-list"]} data-testid={testId}>
      {watched.map((movie) => {
        const { Runtime: runtime, userRating, imdbRating, imdbID } = movie;

        return (
          <Movie key={imdbID} {...{ movie, testId: undefined }}>
            <div style={{ display: "flex" }}>
              <MovieStatistics
                statistics={{
                  imdbRating,
                  userRating: Number(userRating),
                  runtime,
                }}
              />
              <Button
                className={styles["btn-delete"]}
                onClick={() => handleRemoveMovie(imdbID)}
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
