import type { EmitsOptions, ObjectEmitsOptions, SetupContext, SlotsType } from 'vue-demi'
import { defineComponent, getCurrentInstance } from 'vue-demi'

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
type EmitsToProps<T extends EmitsOptions> = T extends string[] ? {
  [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
} : T extends ObjectEmitsOptions ? {
  [K in `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}` ? (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : T[Uncapitalize<C>] extends null ? any[] : never) => any : never;
} : {}
type ShortEmitsToObject<E> = E extends Record<string, any[]> ? {
  [K in keyof E]: (...args: E[K]) => any;
} : E

export interface ForwardRefRenderFunction<
  P = {},
  E extends EmitsOptions | Record<string, any[]> = {},
  S extends Record<string, any> = any,
  EE extends EmitsOptions = ShortEmitsToObject<E>> {
  (
    props: P & EmitsToProps<EE>,
    ctx: Omit<SetupContext<EE, IfAny<S, {}, SlotsType<S>>>, 'expose'>,
    forwardedRef: (ref: any) => void,
  ): any
}

export function forwardRef(renderFunction: ForwardRefRenderFunction) {
  return defineComponent((props, ctx) => {
    const currentInstance = getCurrentInstance()
    const forwardedRef = (ref: any) => {
      if (currentInstance) {
        currentInstance.exposed = ref
        currentInstance.exposeProxy = ref
      }
    }
    return () => renderFunction(props, ctx, forwardedRef)
  })
}
