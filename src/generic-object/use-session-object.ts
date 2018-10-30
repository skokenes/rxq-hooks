import { useState, useEffect } from "react";
import usePipe from "../util/use-pipe";
import useEffectNonNull from "../util/use-effect-non-null";
import useEffectWhenStream from "../util/use-effect-when-stream";
import { pipe, combineLatest } from "rxjs";
import { skip, tap, filter } from "rxjs/operators";
import { Handle } from "rxq";
import useObservableProp from "../util/use-observable-prop";

function useSessionObject(
  docHandle: Handle,
  qDef = {
    qInfo: {
      qType: "rxq-hooks-placeholder"
    }
  },
  defChange?: any[]
) {
  const [handle, setHandle] = useState<Handle | null>(null);

  // Create the handle
  useEffect(() => {
    const sub = docHandle.ask("CreateSessionObject", qDef).subscribe(h => {
      setHandle(h);
    });

    return () => sub.unsubscribe();
  }, []);

  // Skip the first qDef for property updates
  const updatedQDefs$ = useObservableProp(qDef).pipe(skip(1));

  // Observe the handle changes
  const handle$ = useObservableProp(handle).pipe(filter(h => h !== null));

  // When the handle or qDef changes, update the properties
  useEffectWhenStream(() => {
    const sub = (handle as Handle).ask("SetProperties", qDef).subscribe();
    return () => sub.unsubscribe();
  }, combineLatest(handle$, updatedQDefs$));

  return handle;
}

export default useSessionObject;
