import { useState } from "react";
import { startWith } from "rxjs/operators";
import { qAsk, Handle } from "rxq";
import useEffectNonNull from "../util/use-effect-non-null";

const useGenericObjectProperties = (handle: Handle, shouldSync = true) => {
  const [properties, setProperties] = useState(null);

  useEffectNonNull(
    () => {
      if (shouldSync) {
        const sub = handle.invalidated$
          .pipe(
            startWith(handle),
            qAsk("GetProperties")
          )
          .subscribe(setProperties);

        return () => sub.unsubscribe();
      } else {
        return () => {};
      }
    },
    [handle, shouldSync]
  );
  return properties;
};

export default useGenericObjectProperties;
