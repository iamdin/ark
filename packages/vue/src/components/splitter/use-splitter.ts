import * as splitter from '@zag-js/splitter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './splitter.types'

export interface UseSplitterProps extends Optional<Omit<splitter.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseSplitterReturn extends ComputedRef<splitter.Api<PropTypes>> {}

export const useSplitter = (props: MaybeRef<UseSplitterProps>, emit?: EmitFn<RootEmits>): UseSplitterReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<splitter.Props>(() => {
    const localProps = toValue<UseSplitterProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onResize: (details) => {
        emit?.('resize', details)
        emit?.('update:size', details.size)
        localProps.onResize?.(details)
      },
      onResizeEnd: (details) => {
        emit?.('resizeEnd', details)
        localProps.onResizeEnd?.(details)
      },
      onCollapse: (details) => {
        emit?.('collapse', details)
        localProps.onCollapse?.(details)
      },
      onExpand: (details) => {
        emit?.('expand', details)
        localProps.onExpand?.(details)
      },
      onResizeStart() {
        emit?.('resizeStart')
        localProps.onResizeStart?.()
      },
    }
  })

  const service = useMachine(splitter.machine, context)
  return computed(() => splitter.connect(service, normalizeProps))
}
