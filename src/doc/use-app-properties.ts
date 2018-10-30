import { Handle, qAsk } from "rxq";
import { useState, useEffect } from "react";
import { startWith, filter, switchMap } from "rxjs/operators";
import useStreamFromProp from "../util/use-observable-prop";
import { combineLatest, empty, Observable } from "rxjs";

const useAppProperties = (handle: Handle, shouldSync: boolean = true) => {
  const [properties, setProperties] = useState(null);

  const handle$: Observable<Handle> = useStreamFromProp(handle).pipe(
    filter(h => h !== null)
  ) as Observable<Handle>;
  const shouldSync$ = useStreamFromProp(shouldSync) as Observable<boolean>;

  useEffect(() => {
    const sub = combineLatest(handle$, shouldSync$)
      .pipe(
        switchMap(
          ([handle, shouldSync]) =>
            shouldSync
              ? handle.invalidated$.pipe(
                  startWith(handle),
                  qAsk("GetAppProperties")
                )
              : empty()
        )
      )
      .subscribe(setProperties);

    return () => sub.unsubscribe();
  }, []);

  return properties;
};

export default useAppProperties;
