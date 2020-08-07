import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')
// AWS Lambda Environment Variable
const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJXyzvr0Zt1ky5MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi10LWlreWQ5cS5ldS5hdXRoMC5jb20wHhcNMTkxMDAyMTMwODI2WhcN
MzMwNjEwMTMwODI2WjAkMSIwIAYDVQQDExlkZXYtdC1pa3lkOXEuZXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA03KdsuX2Lxw2uj/t
y7YOHfsAYGvMqZh806nn5NvDy/jHfhjZJ7OGPuM4f907pUVhXH+GWEK0STJMbMbP
dt4uOC0+5leQRJ/JZMLsGwCo89Ju5dBD8m9ESDZebwv2wO6mgJlVFqPAccMfOo/8
l37CF1HS1/Ah/HIRu8Egj97jsCEK7gFoVyNjGnXI3stTPBQNSMH5Z79wYX2Y5G5Q
nUr2RncjekqWB2+Quy0ux3BNrXtLuWVjMeOqwX8WxgbwB0TvE+a/WG9CugtdU74j
Zk074qIpH+W+I7ZNDemi8pge0VgaWJTxIvopBVJRMcQPTd0rc1yCi0I9ujAoV9dO
X6mIywIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSVWVYNR5ah
u0su1Ur7qwGO9uJqFzAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
ALRmELwHN7zcwPoeqRGCKVIM6fXSa0pDHmyQmtgUscYT9P+pMKC/w/7txUTdheA7
RJ20qwU4bNvRGHxshSNWVyKQbaoZb7ocNzGso7b4l2SIJsgDEbxjjVeXNgumUq/F
hmTO0xJ1o3+bkMEKZiJqAjJX/w4/wrn0xLIojKX26oY19a8cNvSa+xMWN45rHi7i
KUu0jb38T1AeUV5TMEMlYga8tNpyKbtiqNB1KsVFUnlfUAetAeDvIwKagB9GZsNk
onx/058Sz3yUn9jqLAdqIBM63jXNLfAZiPNMJD0Zh2HZamMuMz2PJ6JIi6mdbUN2
kgvo4I0jRnYFtBhidQw80WI=
-----END CERTIFICATE-----`


export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          },
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt

  if (jwt.header.alg !== 'RS256') {
    throw new Error('Auth0 only supports RS256');
  }

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}