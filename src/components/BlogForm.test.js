import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  let component

  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('verify that the form calls the event handler', () => {
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
  })
})