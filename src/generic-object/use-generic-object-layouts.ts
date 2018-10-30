import { useState } from "react";
import { startWith } from "rxjs/operators";
import { qAsk, Handle } from "rxq";
import useEffectNonNull from "../util/use-effect-non-null";

const useGenericObjectLayouts = (handle: Handle, shouldSync = true) => {
  const [layout, setLayout] = useState(null);

  useEffectNonNull(
    () => {
      if (shouldSync) {
        const sub = handle.invalidated$
          .pipe(
            startWith(handle),
            qAsk("GetLayout")
          )
          .subscribe(setLayout);

        return () => sub.unsubscribe();
      } else {
        return () => {};
      }
    },
    [handle, shouldSync]
  );
  return layout;
};

export default useGenericObjectLayouts;
