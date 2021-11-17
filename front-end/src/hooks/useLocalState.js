import { useState, useEffect } from "react";

function useLocalState(key, defaultState = "") {
  const [state, setState] = useState(
    () => localStorage.getItem(key) || defaultState
  );

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export default useLocalState;
