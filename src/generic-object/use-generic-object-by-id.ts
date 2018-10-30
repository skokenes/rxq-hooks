import { useState, useEffect } from "react";
import useEffectWhenStream from "../util/use-effect-when-stream";
import { combineLatest } from "rxjs";
import { skip, filter, switchMap } from "rxjs/operators";
import { Handle } from "rxq";
import useStreamFromProp from "../util/use-observable-prop";

function useGenericObjectById(docHandle: Handle, qId: string) {
  const [handle, setHandle] = useState<Handle | null>(null);

  const qId$ = useStreamFromProp(qId);

  useEffect(() => {
    const sub = qId$
      .pipe(switchMap(qId => docHandle.ask("GetObject", qId)))
      .subscribe(setHandle);

    return () => sub.unsubscribe();
  }, []);

  return handle;
}

export default useGenericObjectById;
