import { segmentGroupAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { SegmentGroupProvider } from './segment-group-context'
import { emits, props } from './segment-group.props'
import { useSegmentGroup, type UseSegmentGroupProps } from './use-segment-group'

export interface SegmentGroupProps extends Assign<HTMLArkProps<'div'>, UseSegmentGroupProps> {}

export const SegmentGroup = defineComponent<SegmentGroupProps>(
  (props, { slots, attrs, emit }) => {
    const api = useSegmentGroup(props, emit)
    SegmentGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...segmentGroupAnatomy.build().root.attrs} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SegmentGroup',
    props,
    emits,
  },
)
