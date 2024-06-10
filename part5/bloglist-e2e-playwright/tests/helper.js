import { expect } from "@playwright/test"

const loginWith = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.locator('input[name="Title"]').fill(title)
  await page.locator('input[name="Author"]').fill(author)
  await page.locator('input[name="Url"]').fill(url)
  await page.getByRole('button', { name: 'Save blog' }).click()
  await page.getByText(`Title: ${title}`).waitFor()
}

const likeBlog = async (page, title, likes) => {
  const blog = await page.locator('.blog-title').getByText(title)
  
  await blog.locator('..').getByRole('button', {name: 'view' }).click()

  for( let i = 0; i <= likes; i++) {
    await blog.locator('../..').getByRole('button', { name: 'like' }).click()
    await blog.locator('../..').getByText(`Likes: ${i}`).waitFor()
  }
}

export { loginWith, createBlog, likeBlog }