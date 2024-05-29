import { MovieDetailsProps } from "../movie/movie";
import "./rating-duration.less";

export default function RatingAndDuration(
  props: MovieDetailsProps
): JSX.Element {
  const { imdbRating, userRating, Runtime } = props;

  return (
    <section
      className="movie-rating-duration"
      data-testid="ratingAndDurationId"
    >
      <p>
        <span className="icon">⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span className="icon">🌟</span>
        <span>{userRating}</span>
      </p>
      <p>
        <span className="icon">⏳</span>
        <span>{Runtime}</span>
      </p>
    </section>
  );
}
