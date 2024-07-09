import { render, screen, waitFor } from "@testing-library/react";
import MovieAppProvider from "../../context/movie-app-context/movie-app-context";
import MainContent, { MainProps } from "./MainContent";
import { DragDropContext } from "react-beautiful-dnd";

const props: MainProps = {
  testId: "main-content-testId",
  children: <div>Main content</div>,
};

const component = () =>
  render(
    <MovieAppProvider>
      <DragDropContext onDragEnd={() => {}}>
        <MainContent {...props} />
      </DragDropContext>
    </MovieAppProvider>
  );

describe("MainContent Rendering", () => {
  beforeEach(async () => {
    component();
  });

  test("MainContent should be rendered", async () => {
    await waitFor(() => {
      const main = screen.getByTestId(props.testId!);
      expect(main).toBeInTheDocument();
    });
  });

  test("MainContent should render children", async () => {
    await waitFor(() => {
      const main = screen.getByTestId(props.testId!);
      expect(main).toHaveTextContent("Main content");
    });
  });

  test("MainContent container should be <main> tag", async () => {
    await waitFor(() => {
      const main = screen.getByTestId(props.testId!);
      expect(main.tagName).toBe("MAIN");
    });
  });

  test("Should have a className attribute", async () => {
    await waitFor(() => {
      const main = screen.getByTestId(props.testId!);
      expect(main).toHaveAttribute("class");
    });
  });
});
