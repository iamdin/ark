import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useRatingGroupContext } from './rating-group-context'
import type { UseRatingGroupReturn } from './use-rating-group'

export interface RatingGroupControlProps
  extends Assign<
    HTMLArkProps<'div'>,
    { children?: JSX.Element | ((api: UseRatingGroupReturn) => JSX.Element) }
  > {}

export const RatingGroupControl = (props: RatingGroupControlProps) => {
  const api = useRatingGroupContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  const getChildren = () => runIfFn(props.children, api)

  return (
    <>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
      <input {...api().hiddenInputProps} />
    </>
  )
}
