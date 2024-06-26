# v-forward-ref

[![npm version](https://badgen.net/npm/v/v-forward-ref)](https://npm.im/v-forward-ref) [![npm downloads](https://badgen.net/npm/dm/v-forward-ref)](https://npm.im/v-forward-ref)

## Install

via `pnpm`, `yarn` or `npm`:

```bash
pnpm add v-forward-ref
# or
yarn add v-forward-ref
# or
npm i -S v-forward-ref
```

## How to use

```typescript
import { forwardRef } from 'v-forward-ref'

const Comp = defineComponent((props, ctx) => {
  ctx.expose({ foo: 'bar' })

  return () => <div>{props.message}</div>
})

const Wrap = forwardRef((props, { slots }, ref) => {
  return <Comp {...props} ref={ref} v-slots={slots} />
})

const App = defineComponent(() => {
  const cmpRef = ref(null)

  onMounted(() => {
    console.log(cmpRef.value.foo) // => 'bar'
  })

  return () => <Wrap message="Hello" ref={cmpRef} />
})
```

## License

MIT &copy; [Mitscherlich](https://mitscherlich.me)
