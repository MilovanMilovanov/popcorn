import { useEffect } from "react";

type KeyType =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Escape";

export const handleKeyPress = <K extends KeyType, P extends any>(
  key: K,
  params: P,
  action: (params: P) => void
) => {
  key === "Enter" && action?.(params);
  key === "ArrowUp" && action?.(params);
  key === "ArrowDown" && action?.(params);
  key === "ArrowLeft" && action?.(params);
  key === "ArrowRight" && action?.(params);
};

export default function useKey(action: (key: KeyType) => void) {
  useEffect(() => {
    const callBack = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowUp":
          action(e.code);
          break;
        case "ArrowDown":
          action(e.code);
          break;
        case "ArrowRight":
          action(e.code);
          break;
        case "ArrowLeft":
          action(e.code);
          break;
        case "Escape":
          action(e.code);
          break;
        case "Enter":
          action(e.code);
          break;
        default:
          return;
      }
    };

    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [action]);
}
