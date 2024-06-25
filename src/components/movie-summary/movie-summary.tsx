import { MovieComponentProps, MovieDetailsProps } from "../movie/Movie";
import RatingAndDuration from "../rating-duration/Rating-duration";
import "./movie-summary.less";

const average = (arr: number[]) =>
  arr.reduce((acc, cur) => acc + cur / arr.length, 0);

export default function MovieSummary(
  props: MovieComponentProps<MovieDetailsProps>
): JSX.Element {
  const { watched } = props;

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

  return (
    <div className="summary" data-testid="movieSummaryId">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <RatingAndDuration {...{ imdbRating, userRating, Runtime }} />
      </div>
    </div>
  );
}
