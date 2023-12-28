export const props = {
  present: {
    type: Boolean,
    default: undefined,
  },
  lazyMount: Boolean,
  unmountOnExit: Boolean,
}

export const emits = ['exit-complete']
