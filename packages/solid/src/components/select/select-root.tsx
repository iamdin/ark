import { mergeProps } from '@zag-js/solid'
import type { Assign, CollectionItem } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { type UseSelectProps, useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

export interface SelectRootBaseProps<T extends CollectionItem>
  extends UseSelectProps<T>,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface SelectRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, SelectRootBaseProps<T>> {}

export const SelectRoot = <T extends CollectionItem>(props: SelectRootProps<T>) => {
  const [presenceProps, selectProps] = splitPresenceProps(props)
  const [useSelectProps, localProps] = createSplitProps<UseSelectProps<T>>()(selectProps, [
    'closeOnSelect',
    'collection',
    'composite',
    'defaultHighlightedValue',
    'defaultOpen',
    'defaultValue',
    'deselectable',
    'disabled',
    'form',
    'highlightedValue',
    'id',
    'ids',
    'invalid',
    'loopFocus',
    'multiple',
    'name',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'onValueChange',
    'open',
    'positioning',
    'readOnly',
    'required',
    'scrollToIndexFn',
    'value',
  ])

  const select = useSelect(useSelectProps)
  const presenceApi = usePresence(mergeProps(() => ({ present: select().open }), presenceProps))
  const mergedProps = mergeProps(() => select().getRootProps(), localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </SelectProvider>
  )
}
