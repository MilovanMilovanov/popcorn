import Color from "color";

const isLibraryValid = () => {
  try {
    return Color("orange") && true;
  } catch (e) {
    console.log(
      "The Color library didn't receive correct input or theres another issue. https://www.npmjs.com/package/color"
    );
    return false;
  }
};

export const handleConvertColor = (color: unknown, alpha?: number) => {
  if (!isLibraryValid() || !color) {
    return { convertedColor: undefined, colorWithOpacity: undefined };
  }

  const convertedColor = Color(color);
  const colorWithOpacity = alpha ? convertedColor.alpha(alpha) : undefined;

  return { convertedColor, colorWithOpacity };
};
