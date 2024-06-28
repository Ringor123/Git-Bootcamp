import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import React from 'react'
import { describe, expect, beforeEach, test } from 'vitest'

describe('<Blog />', () => {
  let container
  let likeHandler
  let deleteHandler

  beforeEach(() => {
    const blog = ({
      title: 'New Blog',
      author: 'Pablo',
      url: 'www.Pablo.com',
      likes: 0
    })

    likeHandler = vi.fn()
    deleteHandler = vi.fn()

    container = render(
      <Blog blog={blog} updateBlog={likeHandler} deleteBlog={deleteHandler} user={{}} />
    ).container
  })

  test('Title and author are shown by defect but not URL and likes', async() => {
    const title = screen.getByText('New Blog')
    const author = screen.getByText('Pablo')

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()

    const url = screen.queryByText('www.Pablo.com')
    const likes = screen.queryByText('Likes: 0')

    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })

  test('URL and likes shown when the view button is clicked', async() => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const title = screen.getByText('New Blog')
    const author = screen.getByText('Pablo')
    const url = screen.getByText('www.Pablo.com')
    const likes = container.querySelector('.blog-likes')


    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })

  test('Twoo clicks on like button calls handleUpdate twoo times', async() => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})
