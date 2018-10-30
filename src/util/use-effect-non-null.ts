import { useEffect } from "react";

const useEffectNonNull = (effect: () => () => void, deps: any[]) => {
  useEffect(() => {
    if (deps.some(dep => dep === null) === false) {
      return effect();
    }
  }, deps);
};

export default useEffectNonNull;
