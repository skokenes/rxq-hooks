import { useCallback } from "react";
import { Handle } from "rxq";
import useGenericObjectDispatcher from "./use-generic-object-dispatcher";

const useGenericObjectPatcher = (handle: Handle) => {
  const dispatcher = useGenericObjectDispatcher(handle);
  const sendPatches = useCallback((...params) => {
    dispatcher("ApplyPatches", ...params);
  }, []);

  return sendPatches;
};

export default useGenericObjectPatcher;
