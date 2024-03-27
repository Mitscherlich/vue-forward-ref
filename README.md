# @m9ch/vue-forward-ref

[![npm version](https://badgen.net/npm/v/@m9ch/vue-forward-ref)](https://npm.im/@m9ch/vue-forward-ref) [![npm downloads](https://badgen.net/npm/dm/@m9ch/vue-forward-ref)](https://npm.im/@m9ch/vue-forward-ref)

## Install

via `pnpm`, `yarn` or `npm`:

```bash
pnpm add @m9ch/vue-forward-ref
# or
yarn add @m9ch/vue-forward-ref
# or
npm i -S @m9ch/vue-forward-ref
```

## How to use

```typescript
import { forwardRef } from '@m9ch/vue-forward-ref'

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
