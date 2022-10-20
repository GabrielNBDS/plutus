import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class AuthController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
    const google = ally.use('google')

    /**
     * User has explicitly denied the login request
     */
    if (google.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()

    /**
     * Find the user by email or create
     * a new one
     */
    const user = await User.firstOrCreate(
      {
        email: googleUser.email!,
      },
      {
        name: googleUser.name,
        accessToken: googleUser.token.token,
        avatar: googleUser.avatarUrl || undefined,
      }
    )

    /**
     * Login user using the web guard
     */
    await auth.use('web').login(user)

    return response.redirect('/dashboard')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
