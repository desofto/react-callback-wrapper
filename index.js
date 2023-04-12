import React from 'react'

export default function useCallbackWrapper(fn) {
  const callback = React.useRef(null)
  callback.current = fn

  return React.useCallback((...params) => {
    callback.current(...params)
  }, [callback])
}
