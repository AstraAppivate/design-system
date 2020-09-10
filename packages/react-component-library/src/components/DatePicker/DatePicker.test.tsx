import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { DatePicker, DATEPICKER_PLACEMENT } from '.'

const NOW = '2019-12-05T11:00:00.000Z'

function click(element: HTMLElement) {
  fireEvent.mouseDown(element)
  fireEvent.click(element)
}

describe('DatePicker', () => {
  let wrapper: RenderResult
  let startDate: Date
  let label: string
  let onChange: (data: { startDate: Date; endDate: Date }) => void
  let onBlur: (e: React.FormEvent) => void
  let dateSpy: jest.SpyInstance
  let days: string[]
  let onSubmitSpy: (e: React.FormEvent) => void

  function assertInputButtonAria({
    ariaExpanded,
    ariaLabel,
  }: {
    ariaExpanded: string
    ariaLabel: string
  }) {
    it('updates the ARIA attributes on the input button', () => {
      const button = wrapper.getByTestId('datepicker-input-button')
      const dayPickerId = wrapper
        .getByTestId('floating-box-content')
        .getAttribute('id')

      expect(button).toHaveAttribute('aria-expanded', ariaExpanded)
      expect(button).toHaveAttribute('aria-label', ariaLabel)
      expect(button).toHaveAttribute('aria-owns', dayPickerId)
    })
  }

  beforeAll(() => {
    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(NOW).valueOf())

    function leadingZero(n: number): string {
      return n > 9 ? `${n}` : `0${n}`
    }

    days = new Array(31).map((i) => leadingZero(i + 1)) // [01, 02, ..., 31]
  })

  afterAll(() => {
    dateSpy.mockRestore()
  })

  describe('default props', () => {
    beforeEach(() => {
      startDate = new Date('12/01/2019')
      onChange = jest.fn()
      onBlur = jest.fn()

      wrapper = render(
        <>
          <DatePicker
            startDate={startDate}
            placement={DATEPICKER_PLACEMENT.BELOW}
            onChange={onChange}
            onBlur={onBlur}
          />
          <div data-testid="datepicker-outside" />
        </>
      )
    })

    it('applies the `aria-label` to the input', () => {
      expect(wrapper.getByTestId('datepicker-input')).toHaveAttribute(
        'aria-label',
        'Choose date'
      )
    })

    assertInputButtonAria({
      ariaExpanded: 'false',
      ariaLabel: 'Show day picker',
    })

    it('should set the `role` attribute for the Day buttons', () => {
      days.forEach((_, index) => {
        expect(
          wrapper.getByTestId(`datepicker-day-${index + 1}`)
        ).toHaveAttribute('role', 'option')
      })
    })

    it('should set the `aria-selected` attribute for the day buttons', () => {
      days.forEach((_, index) => {
        expect(
          wrapper.getByTestId(`datepicker-day-${index + 1}`)
        ).toHaveAttribute('aria-selected', 'false')
      })
    })

    it('renders the component', () => {
      expect(wrapper.queryByTestId('datepicker-wrapper')).toBeInTheDocument()
    })

    it('renders the correct sequence of days', () => {
      days.forEach((day) => {
        expect(
          wrapper.queryByTestId(`datepicker-day-${day}`)
        ).toBeInTheDocument()
      })
    })

    describe('when the end user clicks the open close button', () => {
      beforeEach(() => {
        wrapper.getByTestId('datepicker-input-button').click()
      })

      assertInputButtonAria({
        ariaExpanded: 'true',
        ariaLabel: 'Hide day picker',
      })

      it('displays the container', () => {
        expect(
          wrapper.getByTestId('datepicker-input-wrapper').classList
        ).toContain('is-open')

        expect(wrapper.getByTestId('floating-box').classList).toContain(
          'is-visible'
        )
      })

      describe('and the user clicks it again', () => {
        beforeEach(() => {
          wrapper.getByTestId('datepicker-input-button').click()
        })

        assertInputButtonAria({
          ariaExpanded: 'false',
          ariaLabel: 'Show day picker',
        })

        it('hides the container', () => {
          expect(
            wrapper.getByTestId('datepicker-input-wrapper').classList
          ).not.toContain('is-open')

          expect(wrapper.getByTestId('floating-box').classList).not.toContain(
            'is-visible'
          )
        })
      })
    })

    describe('when the end user focuses on the Input', () => {
      beforeEach(() => {
        wrapper.getByTestId('datepicker-input').focus()
      })

      it('shows the month', () => {
        expect(wrapper.queryByText('December 2019')).toBeInTheDocument()
      })

      it('displays the container', () => {
        expect(
          wrapper.getByTestId('datepicker-input-wrapper').classList
        ).toContain('is-open')

        expect(wrapper.getByTestId('floating-box').classList).toContain(
          'is-visible'
        )
      })

      describe('and clicks on a day', () => {
        beforeEach(() => {
          click(wrapper.getByText('31'))
        })

        it('set the value of the component to this date', () => {
          expect(
            wrapper.getByTestId('datepicker-input').getAttribute('value')
          ).toBe('12/31/2019')
        })

        it('invokes the onChange callback', () => {
          expect(onChange).toHaveBeenCalledTimes(1)
          expect(onChange).toHaveBeenCalledWith({
            startDate: new Date('2019-12-31T12:00:00.000Z'),
            endDate: new Date('2019-12-31T12:00:00.000Z'),
          })
        })

        it('does not hide the container', () => {
          expect(
            wrapper.getByTestId('datepicker-input-wrapper').classList
          ).toContain('is-open')

          expect(wrapper.getByTestId('floating-box').classList).toContain(
            'is-visible'
          )
        })
      })

      describe('and clicks outside the date picker', () => {
        beforeEach(() => {
          fireEvent.mouseDown(wrapper.getByTestId('datepicker-outside'))
        })

        it('hides the container', () => {
          expect(
            wrapper.getByTestId('datepicker-input-wrapper').classList
          ).not.toContain('is-open')

          expect(wrapper.getByTestId('floating-box').classList).not.toContain(
            'is-visible'
          )
        })
      })
    })
  })

  describe('when a custom label is provided', () => {
    beforeEach(() => {
      label = 'Custom Label'

      wrapper = render(
        <DatePicker label={label} placement={DATEPICKER_PLACEMENT.BELOW} />
      )
    })

    it('renders that label accordingly', () => {
      expect(wrapper.getByTestId('datepicker-label').innerHTML).toBe(label)
    })
  })

  describe('when isDisabled prop is provided', () => {
    beforeEach(() => {
      wrapper = render(
        <DatePicker placement={DATEPICKER_PLACEMENT.BELOW} isDisabled />
      )
    })

    it('applies the `is-disabled` stateful class', () => {
      expect(
        wrapper.getByTestId('datepicker-input-wrapper').classList
      ).toContain('is-disabled')
    })

    it('applies the disabled attribute to the input', () => {
      expect(wrapper.getByTestId('datepicker-input')).toHaveAttribute(
        'disabled'
      )
    })
  })

  describe('when selecting a date range', () => {
    beforeEach(() => {
      onChange = jest.fn()
      startDate = new Date('12/01/2019')

      wrapper = render(
        <DatePicker
          startDate={startDate}
          placement={DATEPICKER_PLACEMENT.BELOW}
          onChange={onChange}
          isRange
        />
      )
    })

    describe('when the end user focuses on the Input', () => {
      beforeEach(() => {
        wrapper.getByTestId('datepicker-input').focus()
      })

      describe('and the end user clicks on the navigate month buttons', () => {
        describe('and clicks next', () => {
          beforeEach(() => {
            wrapper.getByTestId('datepicker-input').focus()

            click(wrapper.getAllByRole('button')[1])
          })
        })

        describe('and clicks previous', () => {
          beforeEach(() => {
            wrapper.getByTestId('datepicker-input').focus()

            click(wrapper.getAllByRole('button')[0])
          })
        })

        describe('and clicks on a day in the first month', () => {
          beforeEach(() => {
            click(wrapper.getAllByText('31')[0])
          })

          it('set the value of the component to this date', () => {
            expect(
              wrapper.getByTestId('datepicker-input').getAttribute('value')
            ).toBe('12/1/2019 - 12/31/2019')
          })

          it('invokes the onChange callback', () => {
            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith({
              startDate: new Date('2019-12-01T00:00:00.000Z'),
              endDate: new Date('2019-12-31T12:00:00.000Z'),
            })
          })
        })

        describe('and clicks on days in both months', () => {
          beforeEach(() => {
            click(wrapper.getAllByText('1')[0])
            click(wrapper.getAllByText('20')[1])
          })

          it('set the value of the component to this date', () => {
            expect(
              wrapper.getByTestId('datepicker-input').getAttribute('value')
            ).toBe('12/1/2019 - 1/20/2020')
          })

          it('invokes the onChange callback', () => {
            expect(onChange).toHaveBeenCalledTimes(2)
            expect(onChange).toHaveBeenCalledWith({
              startDate: new Date('2019-12-01T00:00:00.000Z'),
              endDate: new Date('2020-01-20T12:00:00.000Z'),
            })
            expect(onChange).toHaveBeenCalledWith({
              startDate: new Date('2019-12-01T00:00:00.000Z'),
              endDate: new Date('2020-01-20T12:00:00.000Z'),
            })
          })
        })
      })
    })
  })

  describe('when the isOpen prop is provided', () => {
    beforeEach(() => {
      wrapper = render(<DatePicker isOpen />)
    })

    it('displays the picker as open on initial render', () => {
      expect(
        wrapper.getByTestId('datepicker-input-wrapper').classList
      ).toContain('is-open')

      expect(wrapper.getByTestId('floating-box').classList).toContain(
        'is-visible'
      )
    })
  })

  describe('when the DatePicker is nested within a form', () => {
    beforeEach(() => {
      onSubmitSpy = jest.fn()
      wrapper = render(
        <form onSubmit={onSubmitSpy}>
          <DatePicker />
        </form>
      )
    })

    describe('and the open/close button is clicked', () => {
      beforeEach(() => {
        wrapper.getByTestId('datepicker-input-button').click()
      })

      it('does not submit the form', () => {
        expect(onSubmitSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('when the `disabled` prop is provided', () => {
    beforeEach(() => {
      wrapper = render(<DatePicker isDisabled />)
    })

    it('sets the disabled attribute correctly for the input', () => {
      expect(wrapper.getByTestId('datepicker-input')).toHaveAttribute(
        'disabled'
      )
    })
  })

  describe('when the `disabledDays` prop is provided', () => {
    beforeEach(() => {
      onChange = jest.fn()

      wrapper = render(
        <DatePicker
          isOpen
          onChange={onChange}
          startDate={new Date(2020, 3, 1)}
          disabledDays={[new Date(2020, 3, 12)]}
        />
      )
    })

    it('applies the disabled modifier class to the correct days', () => {
      expect(wrapper.getByText('12')).toHaveClass('DayPicker-Day--disabled')
    })

    describe('and a disabled day is clicked', () => {
      beforeEach(() => {
        click(wrapper.getByText('12'))
      })

      it('does not set the picker to that day', () => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })

  describe('when the `initialMonth` prop is provided and no `startDate`', () => {
    beforeEach(() => {
      wrapper = render(<DatePicker isOpen initialMonth={new Date(2020, 1)} />)
    })

    it('displays the correct month initially', () => {
      expect(wrapper.queryByText('February 2020')).toBeInTheDocument()
    })

    it('does not set a startDate', () => {
      expect(wrapper.getByTestId('datepicker-input')).toHaveAttribute(
        'value',
        ''
      )
    })
  })
})
