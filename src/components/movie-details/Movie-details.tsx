import { useState, useEffect } from "react";
import { useMovieAppContext } from "../../context/movie-app-context/movie-app-context";
import { MovieProps } from "../movie/Movie";
import useKey from "../../hooks/useKey/useKey";
import Loading from "../loader/Loader";
import StarRating from "../star-rating/Star-rating";
import Button from "../button/Button";
import styles from "./movie-details.module.less";

const API_KEY = "d74493d0";

export interface MovieDetailsProps {
  testId?: string;
}

export default function MovieDetails(props: MovieDetailsProps) {
  const { watched, selectedId, handleCloseDetails, handleUpdateWatchedlist } =
    useMovieAppContext();
  const [movie, setMovie] = useState<MovieProps>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const { testId } = props;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
    imdbID,
  } = movie;

  const isMovieInWatchlist = watched.find(
    (movie) => movie.imdbID === selectedId
  );

  const updateWatchlist = () => {
    const movieData = {
      Title: title,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      imdbID,
      userRating: `${userRating}`,
    };
    handleUpdateWatchedlist(movieData);
  };

  useEffect(() => {
    async function fetchMovieInfo(): Promise<void> {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    fetchMovieInfo();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie | ${title ?? "UsePopcorn"}`;
    return () => {
      document.title = "Movie | UsePopcorn";
    };
  }, [title]);

  useKey(handleCloseDetails);

  return (
    <div className={styles.details} data-testid={testId}>
      {isLoading ? (
        <Loading>
          <span>Loading movies...</span>
        </Loading>
      ) : (
        <>
          <header className={styles.header}>
            <Button className={styles["btn-back"]} onClick={handleCloseDetails}>
              &larr;
            </Button>
            <img
              className={styles["poster-img"]}
              src={poster}
              alt={`Poster of ${movie} movie`}
            />
            <div className={styles.overview}>
              <h2 className={styles["movie-title"]}>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐{imdbRating} IMDb rating</p>
            </div>
          </header>

          <section className={styles.body}>
            <div className={styles.rating}>
              {isMovieInWatchlist ? (
                <p className={styles["user-rating"]}>
                  <span>🌟</span>
                  {isMovieInWatchlist.userRating} Your rating for this movie
                </p>
              ) : (
                <StarRating
                  maxRating={10}
                  size={22}
                  color={"goldenrod"}
                  alpha={0.3}
                  setUserRating={setUserRating}
                />
              )}
              {userRating && (
                <Button className={styles["btn-add"]} onClick={updateWatchlist}>
                  <span>+ Add to List</span>
                </Button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starting {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
