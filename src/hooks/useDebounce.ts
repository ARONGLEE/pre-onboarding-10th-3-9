import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay = 500): string => {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
