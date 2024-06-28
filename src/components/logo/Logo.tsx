import { ReactNode } from "react";
import "./logo.less";

export interface LogoProps {
  isMovieLoaded?: boolean;
  children: ReactNode;
  testId?: string;
}

export default function Logo(props: LogoProps) {
  const { isMovieLoaded, testId, children } = props;
  return (
    <div
      data-testid={testId}
      className={`logo ${isMovieLoaded ? "logo-highlight" : ""}`}
    >
      {children}
    </div>
  );
}
