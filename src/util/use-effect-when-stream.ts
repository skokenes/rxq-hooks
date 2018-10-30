import { useState, useEffect } from "react";
import { Observable } from "rxjs";

const useEffectWhenStream = (effect: any, stream: Observable<any>) => {
  const [fireEffect, setFireEffect] = useState<{} | null>(null);

  useEffect(
    () => {
      if (fireEffect === null) {
      } else {
        return effect();
      }
    },
    [fireEffect]
  );

  useEffect(() => {
    const sub = stream.subscribe(() => {
      setFireEffect({});
    });
    return () => sub.unsubscribe();
  }, []);
};

export default useEffectWhenStream;
