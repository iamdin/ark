import type { Context } from '@zag-js/select'
import type { PropType } from 'vue'
import type { CollectionItem } from '../types'

export const props = <T extends CollectionItem>() => ({
  closeOnSelect: {
    type: Boolean as PropType<Context<T>['closeOnSelect']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  form: {
    type: String as PropType<Context['form']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  highlightedValue: {
    type: String as PropType<Context['highlightedValue']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
    default: undefined,
  },
  loop: {
    type: Boolean as PropType<Context['loop']>,
    default: undefined,
  },
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
    default: undefined,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
    default: undefined,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  selectOnBlur: {
    type: Boolean as PropType<Context['selectOnBlur']>,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
})

export const emits = ['highlight-change', 'open-change', 'value-change', 'update:modelValue']
