# rxq-hooks
React hooks for RxQ

## Example usage

App Props / Layouts
```javascript
const MyApp = function() {
  // the Doc handle
  const doc = useContext(QaeContext).doc;
  // validated app properties
  const properties = useAppProperties(doc);
  // validated app layouts
  const layout = useAppLayouts(doc);
  
  // render
  return null;
}
```

Existing Generic Object
```javascript
const ExistingObject = ({qId}) => {
  // the Doc Handle
  const doc = useContext(QaeContext).doc;
  // The object handle for given qId
  const handle = useGenericObjectById(doc, qId);
  // Validated properties
  const properties = useGenericObjectProperties(handle);
  // Validated layout
  const layout = useGenericObjectLayouts(handle);
  // Helper function to apply patches to object
  const applyPatches = useGenericObjectPatcher(handle);

  // render
  return null;
```

Session Objects
```javascript
const SessionObject = ({qDef}) => {
  // the Doc handle
  const doc = useContext(QaeContext).doc;
  // handle for the session object. any changes to qDef will automatically be set on the object
  const handle = useSessionObject(doc, qDef);
  // validated layout, second prop can be used to toggle validation
  const layout = useGenericObjectLayouts(handle, syncLayouts);
  // validated properties, second prop can be used to toggle validation
  const properties = useGenericObjectProperties(handle, syncProperties);

  // render
  return null;
}
```