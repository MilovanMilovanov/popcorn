import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Movie, { MovieDetailsProps } from "./Movie";

const testId = "movie-testId";

const props: MovieDetailsProps = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "2010",
  Poster: "image",
};

const component = (func?: () => {}) =>
  render(
    <Movie testId={testId} movie={props} handleSelectedId={func}>
      <span>{props.Year}</span>
    </Movie>
  );

describe("Movie Redenring", () => {
  test("Should render movie props correctly", () => {
    component();
    const texts = [props.Title, props.Year];
    texts.forEach((text) => {
      expect(screen.getByText(text!)).toBeInTheDocument();
    });

    const li = screen.getByTestId(testId);
    expect(li).toBeInTheDocument();
  });

  test("Should run handleSelectedId once", () => {
    const handleSelectedId = vi.fn();
    component(handleSelectedId);

    const li = screen.getByTestId(testId);

    fireEvent.click(li);
    expect(handleSelectedId).toBeCalledTimes(1);
  });
  test("Should render the Poster", () => {
    component();

    const li = screen.getByTestId(testId);
    const poster = li.querySelector("img.poster-img");
    expect(poster).toBeInTheDocument();
  });
});
