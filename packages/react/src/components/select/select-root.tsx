import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import type { CollectionItem } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { type UseSelectProps, useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

export interface SelectRootBaseProps<T extends CollectionItem>
  extends UseSelectProps<T>,
    UsePresenceProps,
    PolymorphicProps {}
export interface SelectRootProps<T extends CollectionItem> extends Assign<HTMLProps<'div'>, SelectRootBaseProps<T>> {}

const SelectImpl = <T extends CollectionItem>(props: SelectRootProps<T>, ref: React.Ref<HTMLDivElement>) => {
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
  const presence = usePresence(mergeProps({ present: select.open }, presenceProps))
  const mergedProps = mergeProps(select.getRootProps(), localProps)

  return (
    <SelectProvider value={select}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </SelectProvider>
  )
}

export type SelectComponent = <T extends CollectionItem>(
  props: SelectRootProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const SelectRoot = forwardRef(SelectImpl) as SelectComponent
