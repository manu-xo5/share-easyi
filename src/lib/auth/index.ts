import { createAuthClient } from 'better-auth/react'
import { RestApi } from '../rest-api'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
})

export async function googleSignIn() {
  const res = await RestApi.get('/ping')
  if (!res.ok) {
    throw Error('server down')
  }

  const { data, error } = await authClient.signIn.social({
    provider: 'google',
    callbackURL: window.location.origin,
  })

  if (error) {
    throw Error(error.message)
  }

  return data
}
