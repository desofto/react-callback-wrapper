# react-callback-wrapper

Allows to optimize components re-rendering using `memo`, substitutes `useCallback`.

With `useCallback` we have a problem that when state is changed, callback function is re-generate as well (we should specify state as dependents) and, as result, all components which depend on this callback, are re-rendered.
Using `callback-wrapper` it is possible to keep callback function immutable and still have a fresh state inside.

Just install the package:

```
npm i --save react-callback-wrapper
```

And wrap your callback with `cbw`:

```
import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import cbw from 'react-callback-wrapper'

const Button = memo(({ onClick, children }) => {
  console.log('render')
  return (
    <button onClick={onClick}>{children}</button>
  )
})

function App() {
  const [count, setCount] = useState(0)

  const inc = cbw(() => {
    setCount(count + 1)
  })

  useEffect(() => {
    const timer = setInterval(inc, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {count}
      <Button onClick={cbw(() => setCount(count + 1))}>inc</Button>
      <Button onClick={cbw(() => setCount(count - 1))}>dec</Button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```
