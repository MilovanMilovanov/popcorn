import { ReactNode } from "react";
import "./navigation.less";

export interface NavigationProps {
  testId?: string;
  children?: ReactNode;
}
export default function Navigation(props: NavigationProps) {
  const { testId, children } = props;
  return (
    <nav className="nav-bar" data-testid={testId}>
      {children}
    </nav>
  );
}
