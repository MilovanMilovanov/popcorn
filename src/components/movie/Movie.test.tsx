import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Movie, { MovieProps } from "./Movie";
import MovieAppProvider, {
  initialState,
} from "../../context/movie-app-context/movie-app-context";

const testId = "movie-testId";

const props: MovieProps = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "2010",
  Poster: "image",
};

const component = (params = initialState) =>
  render(
    <MovieAppProvider contextValue={params}>
      <Movie testId={testId} movie={props}>
        <span>{props.Year}</span>
      </Movie>
    </MovieAppProvider>
  );

describe("Movie Redenring", () => {
  test("Should render movie props correctly", () => {
    component();
    const texts = [props.Title, props.Year];
    texts.forEach((text) => {
      expect(screen.getByText(text!)).toBeInTheDocument();
    });

    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  });

  test("Should run handleSelectedId once", () => {
    const handleSelectedId = vi.fn();
    component({ ...initialState, handleSelectedId });

    const element = screen.getByTestId(testId);

    fireEvent.click(element);
    expect(handleSelectedId).toBeCalledTimes(1);
  });
  test("Should render the Poster", () => {
    component();

    const poster = screen.queryByAltText(`${props.Title} poster`);
    expect(poster).toBeInTheDocument();
  });
});
