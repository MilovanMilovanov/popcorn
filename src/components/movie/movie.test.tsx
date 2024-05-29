import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Movie, { MovieDetailsProps } from "./movie";

const movie: MovieDetailsProps = {
  imdbID: "tt1375666",
  Title: "Inception",
  Year: "2010",
  Poster: "image",
};

const component = (func?: () => {}) =>
  render(
    <Movie movie={movie} handleSelectedId={func}>
      <span>{movie.Year}</span>
    </Movie>
  );

describe("Movie Redenring", () => {
  test("Should render movie props correctly", () => {
    component();
    const texts = [movie.Title, movie.Year];
    texts.forEach((text) => {
      expect(screen.getByText(text!)).toBeInTheDocument();
    });

    const wrapper = screen.getByRole("button");
    expect(wrapper).toBeInTheDocument();
  });

  test("Should run handleSelectedId once", () => {
    const handleSelectedId = vi.fn();
    component(handleSelectedId);

    const wrapper = screen.getByRole("button");
    expect(wrapper).toBeInTheDocument();

    fireEvent.click(wrapper);
    expect(handleSelectedId).toBeCalledTimes(1);
  });
  test("Should render the Poster", () => {
    component();

    const wrapper = screen.getByRole("button");
    const poster = wrapper.querySelector("img.poster-img");
    expect(poster).toBeInTheDocument();
  });
});
