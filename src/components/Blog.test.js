/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {

  const blog = {
    title: 'testing the frontend',
    url: 'https://github.com/testing-library/react-testing-library',
    author: 'Luis',
    likes: '0',
    id: '123',
    userId: '456'
  }

  let component

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBloglikes={mockHandler} />
    )
  })

  test('renders cotent', () => {
    component.getByText('testing the frontend')
    component.getByText('Luis')
    component.getByText('view')
    const el = component.container.querySelector('.togglableContent')
    expect(el).toHaveStyle('display: none')
    // expect(component.container).toHaveTextContent('testing the frontend')
  })

  test('clicking the "view" button hides its information from the parent and shows all information from blog', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(button.parentNode).toHaveStyle('display: none')

    const buttonShows = component.getByText('hide')
    expect(buttonShows.parentNode).not.toHaveStyle('display: none')
  })

  test('two clicks on the like button', () => {
    const like = component.getByText('Like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})