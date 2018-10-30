import { useState, useEffect } from "react";
import { ReplaySubject } from "rxjs";

function useObservableProp(prop: any) {
  const [obs$] = useState(new ReplaySubject(1));
  useEffect(
    () => {
      obs$.next(prop);
    },
    [prop]
  );
  return obs$.asObservable();
}

export default useObservableProp;
