import { useState, useEffect } from "react";
import { pipe, UnaryFunction, Observable } from "rxjs";
import useObservableProp from "./use-observable-prop";

function usePipe(
  prop: any,
  pipe: UnaryFunction<Observable<any>, Observable<any>>
) {
  const [value, setValue] = useState(prop);
  const prop$ = useObservableProp(prop).pipe(pipe);

  useEffect(() => {
    const sub = prop$.subscribe(setValue);
    return () => sub.unsubscribe();
  }, []);

  return value;
}

export default usePipe;
