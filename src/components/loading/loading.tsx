import { ReactNode } from "react";
import "./loading.less";

export interface LoaderProps {
  testId?: string;
  children?: ReactNode;
}
export default function Loader(props: LoaderProps) {
  const { testId, children } = props;
  return (
    <p data-testid={testId} className="loader">
      {children ? children : <span>Loading...</span>}
    </p>
  );
}
