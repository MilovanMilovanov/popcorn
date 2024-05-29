import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MovieList from "./movie-list";
import { MovieComponentProps, MovieDetailsProps } from "../movie/movie";

const props: MovieComponentProps<MovieDetailsProps> = {
  movies: [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
    },
  ],
  handleRemoveMovie: vi.fn(),
};

const component = (props: MovieComponentProps<MovieDetailsProps>) => {
  render(<MovieList {...props} />);
};

describe("MovieList Redenring", () => {
  test("MovieList should be rendered", () => {
    component(props);
    const list = screen.getByTestId("movieListId");

    expect(list).toBeInTheDocument();
    const { Title, Year } = props.movies!.at(0)!;
    expect(screen.queryByText(Title!)).toBeInTheDocument();
    expect(screen.queryByText(Year!)).toBeInTheDocument();
    expect(screen.queryByAltText(`${Title!} poster`)).toBeInTheDocument();
  });
});
