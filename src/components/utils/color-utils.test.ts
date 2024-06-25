import { handleConvertColor } from "./color-utils";

describe("handleConvertColor", () => {
  test("should convert color and opacity values", () => {
    const color = "orange";

    const result = handleConvertColor(color, 1);

    expect(result.convertedColor).toBeDefined();
    expect(result.colorWithOpacity).toBeDefined();
  });

  test("should return undefined when values are not provided", () => {
    const result = handleConvertColor(false);

    expect(result.convertedColor).toBeUndefined();
    expect(result.colorWithOpacity).toBeUndefined();
  });
});
