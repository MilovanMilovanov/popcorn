import { useState, useEffect } from "react";
import useKey from "../../hooks/useKey/useKey";
import Loading from "../loader/Loader";
import StarRating from "../star-rating/Star-rating";
import Button from "../button/Button";
import { MovieDetailsProps } from "../movie/Movie";
import styles from "./movie-details.module.less";

const API_KEY = "d74493d0";

export interface DetailsProps {
  watched: MovieDetailsProps[];
  selectedId: string;
  handleCloseDetails: () => void;
  handleUpdateWatchlist: (movie: MovieDetailsProps) => void;
  testId?: string;
}

export default function MovieDetails(props: DetailsProps): JSX.Element {
  const [movie, setMovie] = useState<MovieDetailsProps>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const {
    selectedId,
    watched,
    testId,
    handleUpdateWatchlist,
    handleCloseDetails,
  } = props;

  const {
    Title,
    Poster,
    Runtime,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
    imdbRating,
    imdbID,
  } = movie;

  const isMovieInWatchlist = watched.find(
    (movie) => movie.imdbID === selectedId
  );

  const updateWatchlist = () => {
    const movieData = {
      Title,
      Poster,
      Runtime,
      imdbID,
      imdbRating,
      userRating,
    };
    handleUpdateWatchlist?.(movieData);
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
    document.title = `Movie | ${Title ?? "UsePopcorn"}`;
    return () => {
      document.title = "Movie | UsePopcorn";
    };
  }, [Title]);

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
              src={Poster}
              alt={`Poster of ${movie} movie`}
            />
            <div className={styles.overview}>
              <h2 className={styles["movie-title"]}>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
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
              <em>{Plot}</em>
            </p>
            <p>Starting {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
