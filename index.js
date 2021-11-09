import { useCallback, useRef } from 'react'

export default function useCallbackWrapper(fn) {
  const callback = useRef(null)
  callback.current = fn

  return useCallback(() => {
    callback.current()
  }, [callback])
}
