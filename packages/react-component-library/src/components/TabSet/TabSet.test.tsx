import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'

import { TabSet, Tab } from '.'

describe('TabSet', () => {
  let tabset: RenderResult
  let onChangeCallback: () => void

  describe('when the TabSet is generated with tabs and onChangeCallback props', () => {
    onChangeCallback = jest.fn()

    beforeEach(() => {
      tabset = render(
        <TabSet onChangeCallback={onChangeCallback}>
          <Tab title="Example Tab 1">
            <p>This is some example tab 1 content</p>
          </Tab>
          <Tab title="Example Tab 2">
            <p>This is some example tab 2 content</p>
          </Tab>
        </TabSet>
      )
    })

    it('should output the correct number of tabs', () => {
      expect(tabset.queryAllByTestId('tab').length).toEqual(2)
    })

    it('should output the correct number of content panels', () => {
      expect(tabset.queryAllByTestId('content').length).toEqual(2)
    })

    describe('when the user clicks on a tab', () => {
      beforeEach(() => {
        fireEvent(
          tabset.getByTestId('select-tab-0'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
      })

      it('should apply the `is-active` class to the appropriate tab', () => {
        expect(
          tabset.getAllByTestId('tab')[0].classList.contains('is-active')
        ).toBe(true)
      })

      it('should invoke the onChangeCallback function', () => {
        expect(onChangeCallback).toHaveBeenCalled()
      })
    })
  })
})
