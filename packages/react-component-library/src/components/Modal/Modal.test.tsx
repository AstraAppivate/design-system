import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { ButtonProps } from '../Button'
import { Modal } from './Modal'

const primaryButton: ButtonProps = {
  onClick: jest.fn(),
  children: 'Primary',
}

const secondaryButton: ButtonProps = {
  onClick: jest.fn(),
  children: 'Secondary',
}

const tertiaryButton: ButtonProps = {
  onClick: jest.fn(),
  children: 'Tertiary',
}

describe('Modal', () => {
  let wrapper: RenderResult
  let title: string
  let onClose: (event: React.FormEvent<HTMLButtonElement>) => void
  let isOpen: boolean

  beforeEach(() => {
    isOpen = true
  })

  describe('when the component is provided no title or buttons', () => {
    describe('and it is set to be initially open', () => {
      beforeEach(() => {
        wrapper = render(
          <Modal isOpen={isOpen}>
            <span>Example child JSX</span>
          </Modal>
        )
      })

      it('should apply the `is-open` class', () => {
        expect(wrapper.queryByTestId('modal-wrapper')).toHaveClass('is-open')
      })

      it('should not render the Header component', () => {
        expect(wrapper.queryByTestId('modal-header')).toBeNull()
      })

      it('should not render the Footer component', () => {
        expect(wrapper.queryByTestId('modal-footer')).toBeNull()
      })
    })
  })

  describe('when the component is provided a title', () => {
    beforeEach(() => {
      title = 'Modal Header'
    })

    describe('and the onClose callback is provided', () => {
      beforeEach(() => {
        onClose = jest.fn()

        wrapper = render(
          <Modal isOpen={isOpen} title={title} onClose={onClose}>
            <span>Example child JSX</span>
          </Modal>
        )
      })
      it('should render the Header component', () => {
        expect(wrapper.queryByTestId('modal-header')).toBeInTheDocument()
      })

      it('should render the child JSX', () => {
        expect(wrapper.queryByTestId('modal-body')).toHaveTextContent(
          'Example child JSX'
        )
      })

      describe('and the close button is clicked', () => {
        beforeEach(() => {
          fireEvent(
            wrapper.getByTestId('modal-close'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          )
        })
        it('should invoke the onClose callback', () => {
          expect(onClose).toHaveBeenCalled()
        })

        it('should apply the `is-closed` stateful class', () => {
          expect(wrapper.queryByTestId('modal-wrapper')).toHaveClass(
            'is-closed'
          )
        })
      })

      describe('and buttons are provided', () => {
        beforeEach(() => {
          wrapper = render(
            <Modal
              isOpen={isOpen}
              title={title}
              onClose={onClose}
              primaryButton={primaryButton}
              secondaryButton={secondaryButton}
              tertiaryButton={tertiaryButton}
            >
              <span>Example child JSX</span>
            </Modal>
          )
        })

        it('should render the Footer component', () => {
          expect(wrapper.queryByTestId('modal-footer')).toBeInTheDocument()
        })

        it('should render all the buttons', () => {
          expect(wrapper.queryByTestId('modal-primary')).toBeInTheDocument()
          expect(wrapper.queryByTestId('modal-secondary')).toBeInTheDocument()
          expect(wrapper.queryByTestId('modal-tertiary')).toBeInTheDocument()
        })

        it('should render primary button as primary variant', () => {
          expect(wrapper.queryByTestId('modal-primary')).toHaveClass(
            'rn-btn--primary'
          )
        })

        it('should render the primary button with an icon', () => {
          expect(wrapper.queryByTestId('modal-primary-confirm')).toBeInTheDocument()
        })

        it('should render secondary button as secondary variant', () => {
          expect(wrapper.queryByTestId('modal-secondary')).toHaveClass(
            'rn-btn--secondary'
          )
        })

        it('should render tertiary button as secondary variant', () => {
          expect(wrapper.queryByTestId('modal-tertiary')).toHaveClass(
            'rn-btn--secondary'
          )
        })
      })
    })
  })
})
