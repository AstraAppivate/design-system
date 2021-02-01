import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { selectors } from '@royalnavy/design-tokens'

import { Pagination } from '.'

const { color } = selectors

describe('Pagination', () => {
  let wrapper: RenderResult

  describe('when there is ten pages of data', () => {
    let onChangeSpy: (currentPage: number, totalPages: number) => void

    beforeEach(() => {
      onChangeSpy = jest.fn()

      wrapper = render(
        <Pagination pageSize={10} total={95} onChange={onChangeSpy} />
      )
    })

    it('should set the `aria-label` attribute correctly for the page buttons', () => {
      expect(wrapper.getByTestId('select-page-1')).toHaveAttribute(
        'aria-label',
        'Page 1'
      )
    })

    it('should set the `aria-label` attribute for the next button', () => {
      expect(wrapper.getByTestId('page-next')).toHaveAttribute(
        'aria-label',
        'Next page'
      )
    })

    it('should set the `aria-label` attribute for the previous button', () => {
      expect(wrapper.getByTestId('page-previous')).toHaveAttribute(
        'aria-label',
        'Previous page'
      )
    })

    it('should set the `aria-hidden` attribute on the icons', () => {
      expect(wrapper.getByTestId('pagination-icon-prev')).toHaveAttribute(
        'aria-hidden',
        'true'
      )

      expect(wrapper.getByTestId('pagination-icon-next')).toHaveAttribute(
        'aria-hidden',
        'true'
      )
    })

    it('should render pages', () => {
      expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
      expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('2')
      expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('3')
      expect(wrapper.getAllByTestId('page')[3]).toHaveTextContent('4')
      expect(wrapper.getAllByTestId('page')[4]).toHaveTextContent('5')
      expect(wrapper.getAllByTestId('page')[5]).toHaveTextContent('...')
      expect(wrapper.getAllByTestId('page')[6]).toHaveTextContent('10')
      expect(wrapper.getAllByTestId('page')).toHaveLength(7)
    })

    it('should apply the set the page to be active', () => {
      const page = wrapper.getByText('1')
      expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
      expect(page).toHaveStyleRule('color', color('neutral', 'white'))
    })

    it('should disable the `Prev` button', () => {
      expect(wrapper.getByText('Prev')).toHaveAttribute('disabled', '')
    })

    it('should enable the `Next` button', () => {
      expect(wrapper.getByText('Next')).not.toHaveAttribute('disabled')
    })

    describe('and the current page is 5', () => {
      beforeEach(() => {
        fireEvent(
          wrapper.getByText('5'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
      })

      it('should call the onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(5, 10)
        expect(onChangeSpy).toHaveBeenCalledTimes(1)
      })

      it('should apply the set the page to be active', () => {
        const page = wrapper.getByText('5')
        expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
        expect(page).toHaveStyleRule('color', color('neutral', 'white'))
      })

      it('should render pages', () => {
        expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
        expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('...')
        expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('4')
        expect(wrapper.getAllByTestId('page')[3]).toHaveTextContent('5')
        expect(wrapper.getAllByTestId('page')[4]).toHaveTextContent('6')
        expect(wrapper.getAllByTestId('page')[5]).toHaveTextContent('...')
        expect(wrapper.getAllByTestId('page')[6]).toHaveTextContent('10')
        expect(wrapper.getAllByTestId('page')).toHaveLength(7)
      })

      it('should enable the `Prev` and `Next` buttons', () => {
        expect(wrapper.getByText('Prev')).not.toHaveAttribute('disabled')
        expect(wrapper.getByText('Next')).not.toHaveAttribute('disabled')
      })

      describe('and the current page goes back to 1 and then 5 again', () => {
        beforeEach(() => {
          fireEvent(
            wrapper.getByText('1'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          )

          fireEvent(
            wrapper.getByText('5'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          )
        })

        it('should call the onChange callback', () => {
          expect(onChangeSpy).toHaveBeenCalledWith(5, 10)
          expect(onChangeSpy).toHaveBeenCalledWith(1, 10)
          expect(onChangeSpy).toHaveBeenCalledWith(5, 10)
          expect(onChangeSpy).toHaveBeenCalledTimes(3)
        })

        it('should render pages', () => {
          expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
          expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('...')
          expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('4')
          expect(wrapper.getAllByTestId('page')[3]).toHaveTextContent('5')
          expect(wrapper.getAllByTestId('page')[4]).toHaveTextContent('6')
          expect(wrapper.getAllByTestId('page')[5]).toHaveTextContent('...')
          expect(wrapper.getAllByTestId('page')[6]).toHaveTextContent('10')
          expect(wrapper.getAllByTestId('page')).toHaveLength(7)
        })
      })
    })

    describe('and the current page is 10', () => {
      beforeEach(() => {
        fireEvent(
          wrapper.getByText('10'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
      })

      it('should call the onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(10, 10)
        expect(onChangeSpy).toHaveBeenCalledTimes(1)
      })

      it('should apply the set the page to be active', () => {
        const page = wrapper.getByText('10')
        expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
        expect(page).toHaveStyleRule('color', color('neutral', 'white'))
      })

      it('should render pages', () => {
        expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
        expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('...')
        expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('6')
        expect(wrapper.getAllByTestId('page')[3]).toHaveTextContent('7')
        expect(wrapper.getAllByTestId('page')[4]).toHaveTextContent('8')
        expect(wrapper.getAllByTestId('page')[5]).toHaveTextContent('9')
        expect(wrapper.getAllByTestId('page')[6]).toHaveTextContent('10')
        expect(wrapper.getAllByTestId('page')).toHaveLength(7)
      })

      it('should enable the `Prev` button', () => {
        expect(wrapper.getByText('Prev')).not.toHaveAttribute('disabled')
      })

      it('should disable the `Next` button', () => {
        expect(wrapper.getByText('Next')).toHaveAttribute('disabled', '')
      })
    })

    describe('and the `Next` button is clicked', () => {
      beforeEach(() => {
        fireEvent(
          wrapper.getByTestId('page-next'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
      })

      it('should call the onChange callback', () => {
        expect(onChangeSpy).toHaveBeenCalledWith(2, 10)
        expect(onChangeSpy).toHaveBeenCalledTimes(1)
      })

      it('should apply the set the page to be active', () => {
        const page = wrapper.getByText('2')
        expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
        expect(page).toHaveStyleRule('color', color('neutral', 'white'))
      })

      describe('and the `Prev` button is clicked', () => {
        beforeEach(() => {
          fireEvent(
            wrapper.getByText('Prev'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          )
        })

        it('should call the onChange callback', () => {
          expect(onChangeSpy).toHaveBeenCalledWith(2, 10)
          expect(onChangeSpy).toHaveBeenCalledWith(1, 10)
          expect(onChangeSpy).toHaveBeenCalledTimes(2)
        })

        it('should apply the set the page to be active', () => {
          const page = wrapper.getByText('1')
          expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
          expect(page).toHaveStyleRule('color', color('neutral', 'white'))
        })
      })
    })
  })

  describe('when there is five pages of data', () => {
    beforeEach(() => {
      wrapper = render(<Pagination pageSize={10} total={45} />)
    })

    it('should render pages', () => {
      expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
      expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('2')
      expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('3')
      expect(wrapper.getAllByTestId('page')[3]).toHaveTextContent('4')
      expect(wrapper.getAllByTestId('page')[4]).toHaveTextContent('5')
      expect(wrapper.getAllByTestId('page')).toHaveLength(5)
    })

    it('should apply the set the page to be active', () => {
      const page = wrapper.getByText('1')
      expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
      expect(page).toHaveStyleRule('color', color('neutral', 'white'))
    })

    it('should disable the `Prev` button', () => {
      expect(wrapper.getByText('Prev')).toHaveAttribute('disabled', '')
    })

    it('should enable the `Next` button', () => {
      expect(wrapper.getByText('Next')).not.toHaveAttribute('disabled')
    })

    describe('and the current page is 5', () => {
      beforeEach(() => {
        fireEvent(
          wrapper.getByText('5'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
      })

      it('should apply the set the page to be active', () => {
        const page = wrapper.getByText('5')
        expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
        expect(page).toHaveStyleRule('color', color('neutral', 'white'))
      })

      it('should render pages', () => {
        expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
        expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('2')
        expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('3')
        expect(wrapper.getAllByTestId('page')[3]).toHaveTextContent('4')
        expect(wrapper.getAllByTestId('page')[4]).toHaveTextContent('5')
        expect(wrapper.getAllByTestId('page')).toHaveLength(5)
      })

      it('should enable the `Prev` button', () => {
        expect(wrapper.getByText('Prev')).not.toHaveAttribute('disabled')
      })

      it('should enable the `Next` button', () => {
        expect(wrapper.getByText('Next')).toHaveAttribute('disabled', '')
      })
    })
  })

  describe('when there is one page of data and the current page is 1', () => {
    beforeEach(() => {
      wrapper = render(<Pagination pageSize={10} total={2} />)
    })

    it('should render pages', () => {
      expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
      expect(wrapper.getAllByTestId('page')).toHaveLength(1)
    })

    it('should apply the set the page to be active', () => {
      const page = wrapper.getByText('1')
      expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
      expect(page).toHaveStyleRule('color', color('neutral', 'white'))
    })

    it('should disable both the `Prev` and `Next` buttons', () => {
      expect(wrapper.getByText('Prev')).toHaveAttribute('disabled', '')
      expect(wrapper.getByText('Next')).toHaveAttribute('disabled', '')
    })
  })

  describe('when there are three pages of data and the current page is 1', () => {
    beforeEach(() => {
      wrapper = render(<Pagination pageSize={10} total={25} />)
    })

    it('should render pages', () => {
      expect(wrapper.getAllByTestId('page')[0]).toHaveTextContent('1')
      expect(wrapper.getAllByTestId('page')[1]).toHaveTextContent('2')
      expect(wrapper.getAllByTestId('page')[2]).toHaveTextContent('3')
      expect(wrapper.getAllByTestId('page')).toHaveLength(3)
    })

    it('should apply the set the page to be active', () => {
      const page = wrapper.getByText('1')
      expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
      expect(page).toHaveStyleRule('color', color('neutral', 'white'))
    })

    it('should enable the `Prev` button', () => {
      expect(wrapper.getByText('Prev')).toHaveAttribute('disabled', '')
    })

    it('should enable the `Next` button', () => {
      expect(wrapper.getByText('Next')).not.toHaveAttribute('disabled')
    })
  })

  describe('when the initial page is 5', () => {
    beforeEach(() => {
      wrapper = render(<Pagination initialPage={5} pageSize={10} total={45} />)
    })

    it('should apply the set the page to be active', () => {
      const page = wrapper.getByText('5')
      expect(page).toHaveStyleRule('background-color', color('neutral', '400'))
      expect(page).toHaveStyleRule('color', color('neutral', 'white'))
    })
  })

  describe('when passing arbitrary props', () => {
    beforeEach(() => {
      wrapper = render(
        <Pagination data-arbitrary="arbitrary" pageSize={10} total={45} />
      )
    })

    it('should spread arbitrary props', () => {
      expect(wrapper.getByTestId('pagination')).toHaveAttribute(
        'data-arbitrary',
        'arbitrary'
      )
    })
  })
})
