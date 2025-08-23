// Use proxy URL in development to avoid CORS issues
const isDevelopment = process.env.NODE_ENV === 'development'

export const UPSTREAM_BASE_URL = isDevelopment 
  ? '/api' // This will be proxied through Next.js
  : 'https://fodxn1p0bh.execute-api.ap-southeast-1.amazonaws.com/dev'

export const COGNITO_ENDPOINT =
  'https://cognito-idp.ap-southeast-1.amazonaws.com/'

export const COGNITO_CLIENT_ID = '5bel48kij6scmr42mddgojebja'


