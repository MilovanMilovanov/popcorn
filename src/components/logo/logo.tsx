import "./logo.less";

export default function Logo({
  isMovieLoaded,
}: {
  isMovieLoaded?: boolean;
}): JSX.Element {
  return (
    <div
      data-testid="logoId"
      className={`logo ${isMovieLoaded ? "logo-highlight" : ""}`}
    >
      <img src="src\assets\popcorn.jpg" alt="animated popcorn image" />
      <h1>usePopcorn</h1>
    </div>
  );
}
