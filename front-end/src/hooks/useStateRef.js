import { useState, useRef, useEffect } from "react";

const useStateRef = (defaultState) => {
  const [state, setState] = useState(defaultState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [state, setState, stateRef];
};

export default useStateRef;
