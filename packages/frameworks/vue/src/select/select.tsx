import { defineComponent, type PropType, type SetupContext } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import type { Assign, CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { useSelect, type UseSelectProps } from './use-select'

export interface SelectProps<T extends CollectionItem = any>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>>,
    UsePresenceProps {}

export const Select = defineComponent(
  <T extends CollectionItem>(props: SelectProps<T>, { attrs, slots, emit }: SetupContext) => {
    const api = useSelect(props, emit)
    const presenceApi = usePresence(
      () => ({
        present: props.present || api.value.isOpen,
        lazyMount: props.lazyMount,
        unmountOnExit: props.unmountOnExit,
      }),
      emit,
    )

    SelectProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'Select',
    props: {
      // ...props,
      // ...presenceProps,
      // Collection Props
      items: Array as PropType<UseSelectProps<CollectionItem>['items']>,
      itemToString: Function as PropType<UseSelectProps<CollectionItem>['itemToString']>,
      // itemToValue: Function as PropType<UseSelectProps['itemToValue']>,
      // isItemDisabled: Function as PropType<UseSelectProps['isItemDisabled']>,
    },
  },
)

const Comp = defineComponent(
  <T extends string | number>(props: { msg: T; list?: T[] }) => {
    // use Composition API here like in <script setup>

    return () => {
      // render function or JSX
      return <div>{props.msg}</div>
    }
  },
  // manual runtime props declaration is currently still needed.
  {
    props: {
      msg: {
        type: [String, Boolean] as PropType<string | number>,
      },
      list: Array as PropType<(string | number)[]>,
    },
  },
)

const a = () => {
  return <Comp msg={'1'} />
}
