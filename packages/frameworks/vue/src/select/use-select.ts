import type { CollectionOptions } from '@zag-js/select'
import * as select from '@zag-js/select'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, toRef, type ComputedRef, type SetupContext } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { CollectionItem, Optional } from '../types'
import { useId } from '../utils'

export interface UseSelectProps<T extends CollectionItem = CollectionItem>
  extends CollectionOptions<T>,
    Omit<Optional<select.Context<T>, 'id'>, 'collection'> {
  modelValue?: select.Context<T>['value']
}

export interface UseSelectReturn<T extends CollectionItem>
  extends ComputedRef<select.Api<PropTypes, T>> {}

export const useSelect = <T extends CollectionItem>(
  props: UseSelectProps<T>,
  emit: SetupContext<{
    'value-change': (details: select.ValueChangeDetails) => void
    'highlight-change': (details: select.HighlightChangeDetails) => void
    'open-change': (details: select.OpenChangeDetails) => void
    'update:modelValue': (value: select.ValueChangeDetails['value']) => void
  }>['emit'],
): UseSelectReturn<T> => {
  const getRootNode = useEnvironmentContext()

  const context = toRef(() => {
    const { items, itemToString, itemToValue, isItemDisabled, modelValue, ...rest } = props
    return {
      getRootNode,
      ...rest,
      collection: select.collection({
        items: items,
        itemToString: itemToString,
        itemToValue: itemToValue,
        isItemDisabled: isItemDisabled,
      }),
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    select.machine({
      id: useId().value,
      ...context.value,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onHighlightChange: (details) => {
        emit('highlight-change', details)
      },
      onOpenChange: (details) => {
        emit('open-change', details)
      },
    }),
    {
      context,
    },
  )

  return computed(() => select.connect(state.value, send, normalizeProps))
}
