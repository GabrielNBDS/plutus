import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/').session({ locale: 'en' })

  response.assertStatus(200)
  response.assertTextIncludes('Control your finances the simple way')
})
