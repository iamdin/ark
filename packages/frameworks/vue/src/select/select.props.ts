import type { Context } from '@zag-js/select'
import type { PropType } from 'vue'

export const props = {
  closeOnSelect: {
    type: Boolean,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  form: String,
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  highlightedValue: {
    type: String as PropType<Context['highlightedValue']>,
  },
  id: String,
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  invalid: {
    type: Boolean,
    default: undefined,
  },
  loop: {
    type: Boolean,
    default: undefined,
  },
  multiple: {
    type: Boolean,
    default: undefined,
  },
  name: String,
  open: {
    type: Boolean,
    default: undefined,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean,
    default: undefined,
  },
  selectOnBlur: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}
