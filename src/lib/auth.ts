export type CognitoAuthResult = {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken?: string
  TokenType: string
}

export type CognitoInitiateAuthResponse = {
  AuthenticationResult?: CognitoAuthResult
  ChallengeName?: string
  Session?: string
}

import { COGNITO_CLIENT_ID, COGNITO_ENDPOINT } from '@/config/api'

export const login = async (username: string, password: string): Promise<CognitoAuthResult> => {
  const res = await fetch(COGNITO_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    },
    body: JSON.stringify({
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: COGNITO_CLIENT_ID,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Login failed (${res.status}): ${text || res.statusText}`)
  }

  const data = (await res.json()) as CognitoInitiateAuthResponse
  if (!data.AuthenticationResult?.AccessToken) {
    throw new Error('Login challenge or missing tokens returned from Cognito')
  }

  const result = data.AuthenticationResult
  const nowSeconds = Math.floor(Date.now() / 1000)
  const expiresAt = nowSeconds + (result.ExpiresIn || 3600)

  try {
    localStorage.setItem('accessToken', result.AccessToken)
    localStorage.setItem('idToken', result.IdToken)
    if (result.RefreshToken) localStorage.setItem('refreshToken', result.RefreshToken)
    localStorage.setItem('tokenExpiresAt', String(expiresAt))
  } catch {}

  return result
}

export const getAccessToken = (): string | null => {
  try {
    const token = localStorage.getItem('accessToken')
    const exp = localStorage.getItem('tokenExpiresAt')
    if (!token || !exp) return null
    const now = Math.floor(Date.now() / 1000)
    if (now >= Number(exp)) return null
    return token
  } catch {
    return null
  }
}

export const logout = () => {
  try {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExpiresAt')
  } catch {}
}


