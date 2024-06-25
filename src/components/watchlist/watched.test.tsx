import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import WatchedList from "./Watchlist";
import { MovieComponentProps, MovieDetailsProps } from "../movie/Movie";

const props: MovieComponentProps<MovieDetailsProps> = {
  watched: [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "16 Jul 2010",
      Runtime: "148 min",
      imdbRating: "8.8 IMDb rating",
      userRating: "7",
    },
  ],
  testId: "watchlist-testId",
  selectedId: "tt1375666",
  handleRemoveMovie: vi.fn(),
};

const component = (props: MovieComponentProps<MovieDetailsProps>) => {
  render(<WatchedList {...props} />);
};

const { Title, userRating, imdbRating, Runtime } = props.watched!.at(0)!;

describe("WatchedList Redenring", () => {
  test("Should render wathclist props", () => {
    component(props);

    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
    expect(screen.queryByText(Title!)).toBeInTheDocument();
    expect(screen.queryByText(imdbRating!)).toBeInTheDocument();
    expect(screen.queryByText(userRating!)).toBeInTheDocument();
    expect(screen.queryByText(Runtime!)).toBeInTheDocument();
    expect(screen.queryByAltText(`${Title!} poster`)).toBeInTheDocument();

    const btnDelete = document.querySelector(".btn-delete");
    expect(btnDelete).toBeInTheDocument();
  });

  test("handleRemoveMovie should be called once", async () => {
    component(props);

    const deleteBtn = document.querySelector(".btn-delete") as Element;

    fireEvent.click(deleteBtn);
    expect(props.handleRemoveMovie).toHaveBeenCalledTimes(1);
  });

  test("Movie should be removed from WatchedList", () => {
    component(props);

    const deleteBtn = document.querySelector(".btn-delete") as Element;
    fireEvent.click(deleteBtn);
    expect(props.handleRemoveMovie).toHaveBeenCalledWith(props.selectedId);

    waitForElementToBeRemoved(() => document.querySelector(".btn-delete")).then(
      () => {
        expect(deleteBtn).not.toBeInTheDocument();
      }
    );
  });
});
