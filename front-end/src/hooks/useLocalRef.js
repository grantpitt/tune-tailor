import { useRef } from "react";

function useLocalRef(key, defaultValue = "") {
  const ref = useRef(localStorage.getItem(key) || defaultValue);

  const setValue = (value) => {
    localStorage.setItem(key, value);
    ref.current = value;
  };

  return [ref, setValue];
}

export default useLocalRef;
