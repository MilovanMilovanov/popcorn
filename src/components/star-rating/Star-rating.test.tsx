import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import StarRating, { StarRatingProps } from "./Star-rating";
import Star from "./star/Star";

const props: StarRatingProps = {
  maxRating: 5,
  starIndex: 3,
  testId: "stars-rating-testId",
};

const component = (props: StarRatingProps) => {
  render(
    <StarRating {...props}>
      <Star />
    </StarRating>
  );
};

describe("StarRating Redenring", () => {
  test("Should render StarsRating component", () => {
    component(props);
    expect(screen.getByTestId(props.testId!)).toBeInTheDocument();
  });

  test("Should render 7 Star istances", () => {
    const maxRating = 7;
    component({ ...props, maxRating });

    const wrapper = screen.getAllByRole("button");
    expect(wrapper.length).toEqual(maxRating);
  });

  test("The user rating should be 3", () => {
    const starIndex = 3;
    component({ ...props, starIndex });

    const wrapper = screen.getAllByRole("button");

    wrapper.forEach((star, index) => {
      if (index === 2) {
        fireEvent.click(star);
        expect(screen.getByText(starIndex)).toBeInTheDocument();
      }
    });
  });
});
