import * as select from '@zag-js/select'
import { computed, defineComponent, type PropType, type SetupContext } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits } from '../presence/presence.props'
import type { Assign, CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { emits, props } from './select.props'
import { useSelect, type UseSelectProps } from './use-select'

export interface SelectProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>>,
    UsePresenceProps {}

const SelectEmits = [...emits, ...presenceEmits] as const
type EmitOptions = typeof SelectEmits

export const Select = defineComponent(
  <T extends CollectionItem>(
    props: SelectProps<T>,
    {
      attrs,
      slots,
      emit,
    }: SetupContext<{
      'highlight-change': select.Context<T>['onHighlightChange']
    }>,
  ) => {
    const api = useSelect(props, emit)

    const presenceProps = computed(() => ({
      present: props.present || api.value.isOpen,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    // TODO: fix type
    const presenceApi = usePresence(presenceProps as any, emit)
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
      ...props,
      // Collection Props
      items: Array as PropType<UseSelectProps['items']>,
      itemToString: Function as PropType<UseSelectProps['itemToString']>,
      itemToValue: Function as PropType<UseSelectProps['itemToValue']>,
      isItemDisabled: Function as PropType<UseSelectProps['isItemDisabled']>,
      // Presence Props
      present: {
        type: Boolean,
        default: undefined,
      },
      lazyMount: Boolean,
      unmountOnExit: Boolean,
    },
    emits: {},
  },
)
