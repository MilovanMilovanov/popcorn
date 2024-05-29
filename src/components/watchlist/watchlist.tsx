import Button from "../button/button";
import Movie, { MovieDetailsProps, MovieComponentProps } from "../movie/movie";
import RatingAndDuration from "../rating-duration/rating-duration";
import "./watchlist.less";

export default function WatchedList(
  props: MovieComponentProps<MovieDetailsProps>
): JSX.Element {
  const { watched, handleRemoveMovie } = props;

  return (
    <ul className="list list-watched" data-testid="watchedListId">
      {watched!.map((movie) => (
        <Movie key={movie.imdbID} {...{ ...props, movie }}>
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
