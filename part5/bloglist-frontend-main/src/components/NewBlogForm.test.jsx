import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import React from 'react'
import { describe, expect, beforeEach, test } from 'vitest'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {

  let container
  let addBlog

  beforeEach(() => {
    addBlog = vi.fn()

    container = render(
      <NewBlogForm addBlog={addBlog} />
    ).container
  })

  test('A new blog can be created', async () => {
    const user = userEvent.setup()

    const titleInput = container.querySelector('.newBlog-title')
    const authorInput = container.querySelector('.newBlog-author')
    const urlInput = container.querySelector('.newBlog-url')

    const submitButton = screen.getByText('Save blog')

    await user.type(titleInput, 'New Blog')
    await user.type(authorInput, 'Pablo')
    await user.type(urlInput, 'www.pablo.com')

    await user.click(submitButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('New Blog')
    expect(addBlog.mock.calls[0][0].author).toBe('Pablo')
    expect(addBlog.mock.calls[0][0].url).toBe('www.pablo.com')
  })
})