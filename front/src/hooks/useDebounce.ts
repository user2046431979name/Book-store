import {useRef} from 'react';

export const useDebounce = <T>(callback: (arg: T) => void, delay: number = 1000) => {
  const timer = useRef< NodeJS.Timeout>();

  return (arg: T) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(arg);
    }, delay);
  };
};