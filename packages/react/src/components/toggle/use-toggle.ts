import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as toggle from '@zag-js/toggle'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseToggleProps extends Optional<Omit<toggle.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseToggleReturn extends toggle.Api<PropTypes> {}

export function useToggle(props?: UseToggleProps): UseToggleReturn {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: toggle.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(toggle.machine, props)
  return toggle.connect(service, normalizeProps)
}
