import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MovieDetails, { DetailsProps } from "./Movie-details";

const props: DetailsProps = {
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
  selectedId: "tt1375666",
  handleCloseDetails: vi.fn(),
  handleUpdateWatchlist: vi.fn(),
  testId: "details-testId",
};

const component = async (params = props as DetailsProps) => {
  render(<MovieDetails {...params} />);
};

const waitForLoadingToDisappear = async () => {
  await waitFor(() =>
    expect(screen.queryByText("Loading movies...")).not.toBeInTheDocument()
  );
};

describe("MovieDetails Redenring", () => {
  test("Should render movie details", async () => {
    component();
    const details = screen.getByTestId(props.testId!);
    expect(details).toBeInTheDocument();

    await waitForLoadingToDisappear();

    const movieTitle = props.watched.at(0)?.Title!;

    expect(screen.getByText(movieTitle)).toBeInTheDocument();
  });

  test("StarRating should be rendered if selectedId is different than current movie id", async () => {
    component({ ...props, selectedId: "different id" });

    await waitForLoadingToDisappear();

    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("Add movie button should not be rendered initially", async () => {
    component(props);

    await waitForLoadingToDisappear();

    const addButton = document.querySelector(".btn-add");
    expect(addButton).not.toBeInTheDocument();
  });

  test("Add movie button should be rendered", async () => {
    component({ ...props, selectedId: "different id" });

    await waitForLoadingToDisappear();

    const wrapper = screen.getByRole("slider");

    const star = wrapper.querySelector(".stars-container div") as Element;
    fireEvent.click(star);

    const addButton = document.querySelector(".btn-add");
    expect(addButton).toBeInTheDocument();
  });

  test("HandleCloseDetails should be called once", async () => {
    component(props);

    await waitForLoadingToDisappear();

    const btnBack = document.querySelector(".btn-back") as Element;

    fireEvent.click(btnBack);

    expect(props.handleCloseDetails).toHaveBeenCalledTimes(1);
  });
});
