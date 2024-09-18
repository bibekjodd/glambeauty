import { useEffect, useState } from 'react';

export const useDebounce = (dependency: unknown, delay = 200) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEnabled(true);
    }, delay);

    return () => {
      setEnabled(false);
      clearTimeout(timeout);
    };
  }, [dependency, delay]);

  return enabled;
};
