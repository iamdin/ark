<script lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useToastContext } from './use-toast-context.js'

  export interface ToastCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}

  export interface ToastCloseTriggerProps extends Assign<HTMLProps<'button'>, ToastCloseTriggerBaseProps> {}

  let { ref = $bindable(null), ...props }: ToastCloseTriggerProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
