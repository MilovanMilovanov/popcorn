import Button from "../button/Button";
import Movie, { MovieDetailsProps, MovieComponentProps } from "../movie/Movie";
import RatingAndDuration from "../rating-duration/Rating-duration";
import "./watchlist.less";

export default function WatchedList(
  props: MovieComponentProps<MovieDetailsProps>
): JSX.Element {
  const { watched, testId, handleRemoveMovie } = props;

  return (
    <ul className="list list-watched" data-testid={testId}>
      {watched!.map((movie) => (
        <Movie
          key={movie.imdbID}
          {...{ ...{ ...props, testId: undefined }, movie }}
        >
          <RatingAndDuration {...{ ...movie }} />
          <Button
            className={"btn-delete"}
            onClick={() => handleRemoveMovie?.(movie.imdbID)}
          >
            –
          </Button>
        </Movie>
      ))}
    </ul>
  );
}
