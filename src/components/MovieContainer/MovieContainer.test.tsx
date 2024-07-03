import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MovieContainer, { MovieContainerProps } from "./MovieContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const props: MovieContainerProps = {
  id: "movieList",
  index: 1,
  testId: "movie-container-testId",
};

const component = () =>
  render(
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <MovieContainer {...props}>
              <p>Content</p>
            </MovieContainer>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

describe("MovieContainer Rendering", () => {
  beforeEach(() => {
    component();
  });
  test("MovieContainer component should be rendered", () => {
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toBeInTheDocument();
  });

  test("MovieContainer content should be vissible", () => {
    const button = screen.getByRole("button", { expanded: true });
    expect(button).toHaveTextContent("–");
    expect(screen.queryByText("Content")).toBeInTheDocument();
  });

  test("MovieContainer content should not be vissible", () => {
    const button = screen.getByRole("button", { expanded: true });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveTextContent("+");
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
});
