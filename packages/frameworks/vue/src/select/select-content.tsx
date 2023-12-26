import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useSelectContext } from './select-context'

export interface SelectContentProps extends HTMLArkProps<'div'> {}

export const SelectContent = defineComponent<SelectContentProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'SelectContent',
    props,
    emits,
  },
)
