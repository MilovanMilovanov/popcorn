import { CSSProperties, useState } from "react";
import Star from "./star/star";
import "./star-rating.less";
import { handleConvertColor } from "../utils/color-utils";
import Color from "color";

const defaultColor = "#FFA500";

const ratingStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
} as CSSProperties;

type RatingPosition = "top" | "right" | "bottom" | "left";

export interface StarRatingProps {
  starIndex?: number;
  className?: string;
  full?: boolean;
  hover?: boolean;
  size?: number;
  color?: string | Color;
  alpha?: number;
  hoverEmptyStarsColor?: string | Color;
  maxRating?: number;
  ratingPosition?: RatingPosition;
  setUserRating?: (num: number) => void;
  handleUpdateRating?: (num: number) => void;
  handleHover?: (num: number) => void;
  testId?: string;
}

export default function StarRating(props: StarRatingProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const {
    maxRating,
    size,
    color,
    alpha,
    ratingPosition,
    testId,
    setUserRating,
  } = props;

  const handleUpdateRating = (curr: number) => {
    setRating(curr);
    setUserRating?.(curr);
  };

  const handleHover = (curr: number) => {
    setTimeout(() => {
      setHover(curr);
    }, 100);
  };

  const { convertedColor: starColor, colorWithOpacity: startHoverColor } =
    handleConvertColor(color || defaultColor, alpha);

  return (
    <div
      className={`rating-position ${ratingPosition}`}
      style={ratingStyles}
      data-testid={testId}
    >
      <div className="stars-container">
        {Array.from({ length: maxRating ?? 10 }, (_, i) => (
          <Star
            handleUpdateRating={handleUpdateRating}
            handleHover={handleHover}
            color={starColor || defaultColor}
            hoverEmptyStarsColor={startHoverColor || color || defaultColor}
            hover={hover >= i + 1}
            full={i + 1 <= rating}
            starIndex={i + 1}
            size={size ?? 30}
            key={i}
          />
        ))}
      </div>
      <p>{rating}</p>
    </div>
  );
}
