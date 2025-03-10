import { datePickerAnatomy } from '@ark-ui/anatomy'
import { render } from '@solidjs/testing-library'
import { getExports, getParts } from '../setup-test'
import { DatePicker } from './'
import { Basic as ComponentUnderTest } from './date-picker.stories'

describe('Date Picker', () => {
  it.each(getParts(datePickerAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(datePickerAnatomy))('should export %s', async (part) => {
    expect(DatePicker[part]).toBeDefined()
  })
})
