import { PropsWithOptionalChildren } from "../../interfaces/interfaces";
import "./navigation.less";

export default function Navigation(
  props: PropsWithOptionalChildren
): JSX.Element {
  return (
    <nav className="nav-bar" data-testid="navId">
      {props.children}
    </nav>
  );
}
