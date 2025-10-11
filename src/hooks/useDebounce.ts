/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

export const useDebounce = (fn: (...args: any[]) => void, delay = 400) => {
  const timer = useRef<any>(null);

  return (...args: any[]) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  };
};
