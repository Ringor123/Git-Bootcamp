const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Test User',
        username: 'test',
        password: 'test'
      }
    })

    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Test User 2',
        username: 'test2',
        password: 'test'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'test')

      await expect(page.getByText('User test logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'testa')

      await expect(page.locator('.error')).toContainText('Wrong Credentials')
      await expect(page.getByText('User test logged-in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'test', 'test')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'new blog with playwright', 'Pablo', 'www.pablo.com')

        await expect(page.getByText('Title: new blog with')).toBeVisible()
        await expect(page.locator('.noError'))
          .toContainText('a new blog new blog with playwright by Pablo added')
      })

      describe('and several notes exists', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'Blog one', 'Pablo', 'www.pablo.com')
          await createBlog(page, 'Blog twoo', 'Pablo', 'www.pablo.com')
          await createBlog(page, 'Blog three', 'Pablo', 'www.pablo.com')
        })

        test('user can like a blog', async ({ page }) => {
          await likeBlog(page, 'Blog one', 1)

          await expect(page.getByText('Likes: 1')).toBeVisible()
          await expect(page.locator('.noError'))
            .toContainText('Blog Blog one by Pablo updated to 1 likes')

        })

        test('user can delete his own blog', async ({ page }) => {
          const firstBlog = await page.locator('.blog-title').getByText('Blog one')

          await firstBlog.locator('..').getByRole('button', { name: 'view' }).click()

          await page.once('dialog', dialog => {
            dialog.accept()
          })

          await firstBlog.locator('../..').getByRole('button', { name: 'Delete blog' }).click()

          await expect(firstBlog).not.toBeVisible()
          await expect(page.locator('.noError'))
            .toContainText('Blog removed successfully')
        })

        test('only can see delete button the owner of the blog', async ({ page }) => {
          await createBlog(page, 'Blog created by Test User', 'Test User', 'www.pablo.com')

          const blogTestUser = await page.locator('.blog-title').getByText('Blog created by Test User')
          await expect(blogTestUser).toBeVisible()

          await blogTestUser.locator('..').getByRole('button', { name: 'view' }).click()
          await expect(blogTestUser.locator('../..').getByRole('button', { name: 'Delete blog' }))
            .toBeVisible()

          await page.getByRole('button', { name: 'logout' }).click()
          await loginWith(page, 'test2', 'test')

          await blogTestUser.locator('..').getByRole('button', { name: 'view' }).click()
          await expect(blogTestUser.locator('../..').getByRole('button', { name: 'Delete blog' }))
            .not.toBeVisible
        })

        test('blogs are sorted by likes', async ({ page }) => {
          await likeBlog(page, 'Blog one', 1)
          await likeBlog(page, 'Blog twoo', 6)
          await likeBlog(page, 'Blog three', 3)

          const allTitles = await page.locator('.blog-title').allTextContents()

          await expect(allTitles).toEqual(['Blog twoo', 'Blog three', 'Blog one'])
        })
      })
    })
  })
})