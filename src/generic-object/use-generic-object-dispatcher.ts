import { useState, useEffect, useCallback } from "react";
import { startWith, withLatestFrom, filter, switchMap } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { qAsk, Handle } from "rxq";
import useStreamFromProp from "../util/use-observable-prop";

const useGenericObjectDispatcher = (handle: Handle) => {
  const [requestPipeline] = useState<Subject<any[]>>(new Subject());
  const sendRequest = useCallback(
    (...request: any[]) => requestPipeline.next(request),
    []
  );
  const handle$: Observable<any> = useStreamFromProp(handle);

  useEffect(() => {
    const sub = requestPipeline
      .pipe(
        withLatestFrom(handle$),
        filter(
          ([request, handle]) =>
            typeof handle !== "undefined" && handle !== null
        ),
        switchMap(([request, handle]) => handle.ask(...request))
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
      requestPipeline.complete();
    };
  }, []);

  return sendRequest;
};

export default useGenericObjectDispatcher;
