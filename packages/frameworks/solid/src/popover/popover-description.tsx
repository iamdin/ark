import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverDescriptionProps extends HTMLArkProps<'div'> {}

export const PopoverDescription = (props: PopoverDescriptionProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().descriptionProps, props)

  return <ark.div {...mergedProps} />
}
