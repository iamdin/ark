import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UsePaginationProps extends Optional<pagination.Context, 'id'> {
  /**
   * The initial page of the pagination.
   */
  defaultPage?: pagination.Context['page']
  /**
   * Called when the page number is changed, and it takes the resulting page number argument
   */
  'onUpdate:page'?: (page: pagination.PageChangeDetails['page']) => void
}

export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (
  props: UsePaginationProps,
  emit: CallableFunction,
): UsePaginationReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    pagination.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      page: props.page ?? props.defaultPage,
      getRootNode,
      onPageChange: (details) => {
        emit('page-change', details)
        emit('update:page', details.page)
      },
    }),
    { context },
  )

  return computed(() => pagination.connect(state.value, send, normalizeProps))
}
