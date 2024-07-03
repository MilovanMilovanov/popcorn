import { ReactNode } from "react";
import styles from "./navbar.module.less";

export interface NavBarProps {
  testId?: string;
  children: ReactNode;
}
export default function NavBar(props: NavBarProps) {
  const { testId, children } = props;
  return (
    <nav className={styles.navbar} data-testid={testId}>
      {children}
    </nav>
  );
}
