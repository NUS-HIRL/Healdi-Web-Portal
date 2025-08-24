import { COGNITO_CLIENT_ID } from "@/config/api"
import { AxiosError } from "axios"

import { cognitoAxios } from "./axios"

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

export const login = async (
  username: string,
  password: string
): Promise<CognitoAuthResult> => {
  try {
    const response = await cognitoAxios.post(
      "",
      {
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password
        },
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: COGNITO_CLIENT_ID
      },
      {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
        }
      }
    )

    const data = response.data as CognitoInitiateAuthResponse
    if (!data.AuthenticationResult?.AccessToken) {
      throw new Error("Login challenge or missing tokens returned from Cognito")
    }

    const result = data.AuthenticationResult
    const nowSeconds = Math.floor(Date.now() / 1000)
    const expiresAt = nowSeconds + (result.ExpiresIn || 3600)

    try {
      localStorage.setItem("accessToken", result.AccessToken)
      localStorage.setItem("idToken", result.IdToken)
      if (result.RefreshToken)
        localStorage.setItem("refreshToken", result.RefreshToken)
      localStorage.setItem("tokenExpiresAt", String(expiresAt))
    } catch {}

    return result
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status) {
      throw new Error(
        `Login failed (${error.response.status}): ${error.response.data || error.response.statusText}`
      )
    }
    throw new Error(
      `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

export const getAccessToken = (): string | null => {
  try {
    const token = localStorage.getItem("accessToken")
    const exp = localStorage.getItem("tokenExpiresAt")
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
    localStorage.removeItem("accessToken")
    localStorage.removeItem("idToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("tokenExpiresAt")
  } catch {}
}
