import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'

export type RootNode = ShadowRoot | Document | Node

export interface UseEnvironmentContext
  extends Accessor<{
    /**
     * The root node of the application.
     * This is used to determine the window and document objects.
     * @default document
     */
    getRootNode(): RootNode
    /**
     * The document context for the root node.
     * @default document
     */
    getDocument(): Document
    /**
     * The window context for the root node.
     * @default window
     */
    getWindow(): Window & typeof globalThis
  }> {}

export const [EnvironmentContextProvider, useEnvironmentContext] = createContext<UseEnvironmentContext>({
  name: 'EnvironmentContext',
  strict: false,
  defaultValue: () => ({
    getRootNode: () => document,
    getDocument: () => document,
    getWindow: () => window as Window & typeof globalThis,
  }),
})
