import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { type UseColorPickerProps, useColorPicker } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'

export interface ColorPickerRootBaseProps extends UseColorPickerProps, UsePresenceProps, PolymorphicProps {}
export interface ColorPickerRootProps extends Assign<HTMLProps<'div'>, ColorPickerRootBaseProps> {}

export const ColorPickerRoot = forwardRef<HTMLDivElement, ColorPickerRootProps>((props, ref) => {
  const [presenceProps, colorPickerProps] = splitPresenceProps(props)
  const [useColorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(colorPickerProps, [
    'closeOnSelect',
    'defaultOpen',
    'defaultValue',
    'defaultFormat',
    'disabled',
    'format',
    'id',
    'ids',
    'initialFocusEl',
    'invalid',
    'name',
    'name',
    'onFocusOutside',
    'onFormatChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onValueChange',
    'onValueChangeEnd',
    'open',
    'openAutoFocus',
    'positioning',
    'readOnly',
    'required',
    'inline',
    'value',
  ])
  const colorPicker = useColorPicker(useColorPickerProps)
  const presence = usePresence(mergeProps({ present: colorPicker.open }, presenceProps))
  const mergedProps = mergeProps(colorPicker.getRootProps(), localProps)

  return (
    <ColorPickerProvider value={colorPicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </ColorPickerProvider>
  )
})

ColorPickerRoot.displayName = 'ColorPickerRoot'
