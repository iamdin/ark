import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useTooltipContext } from './tooltip-context'

export interface TooltipContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const TooltipContent = defineComponent<TooltipContentProps>(
  (props, { slots, attrs }) => {
    const api = useTooltipContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
  {
    name: 'TooltipContent',
    props,
    emits,
  },
)
