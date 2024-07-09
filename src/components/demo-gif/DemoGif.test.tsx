import { render, screen } from "@testing-library/react";
import DemoGif, { DemoGifProps } from "./DemoGif";

const props: DemoGifProps = {
  testId: "demo-gif-testId",
};

const component = () => render(<DemoGif {...props} />);

describe("DemoGif Rendering", () => {
  test("Gif should be visible", () => {
    component();
    const wrapper = screen.getByTestId(props.testId!);
    expect(wrapper).toBeVisible();
  });
});
