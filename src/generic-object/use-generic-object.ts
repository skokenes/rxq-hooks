import { useState, useEffect } from "react";
import useEffectWhenStream from "../util/use-effect-when-stream";
import { combineLatest } from "rxjs";
import { skip, filter } from "rxjs/operators";
import { Handle } from "rxq";
import useStreamFromProp from "../util/use-observable-prop";

function useGenericObject(
  docHandle: Handle,
  qDef = {
    qInfo: {
      qType: "rxq-hooks-placeholder"
    }
  }
) {
  const [handle, setHandle] = useState<Handle | null>(null);

  // Get/create the handle
  useEffect(() => {
    const sub = docHandle.ask("CreateObject", qDef).subscribe(h => {
      setHandle(h);
    });

    return () => sub.unsubscribe();
  }, []);

  // Skip the first qDef for property updates
  const updatedQDefs$ = useStreamFromProp(qDef).pipe(skip(1));

  // Observe the handle changes
  const handle$ = useStreamFromProp(handle).pipe(filter(h => h !== null));

  // When the handle or qDef changes, update the properties
  useEffectWhenStream(() => {
    const sub = (handle as Handle).ask("SetProperties", qDef).subscribe();
    return () => sub.unsubscribe();
  }, combineLatest(handle$, updatedQDefs$));

  return handle;
}

export default useGenericObject;
