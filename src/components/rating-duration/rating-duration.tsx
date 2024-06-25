import { MovieDetailsProps } from "../movie/Movie";
import "./rating-duration.less";

export interface RatingAndDurationProps extends MovieDetailsProps {
  testId?: string;
}
export default function RatingAndDuration(props: RatingAndDurationProps) {
  const { imdbRating, userRating, Runtime, testId } = props;

  return (
    <section className="movie-rating-duration" data-testid={testId}>
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
