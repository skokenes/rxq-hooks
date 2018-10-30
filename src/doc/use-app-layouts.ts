import { Handle, qAsk } from "rxq";
import { useState, useEffect } from "react";
import { startWith, filter, switchMap } from "rxjs/operators";
import useStreamFromProp from "../util/use-observable-prop";
import { combineLatest, empty, Observable } from "rxjs";

const useAppLayouts = (handle: Handle, shouldSync: boolean = true) => {
  const [layout, setLayout] = useState(null);

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
                  qAsk("GetAppLayout")
                )
              : empty()
        )
      )
      .subscribe(setLayout);

    return () => sub.unsubscribe();
  }, []);

  return layout;
};

export default useAppLayouts;
