import jwt from 'jsonwebtoken'
import { UsersApi } from '../schema/user/datasources'
import { cookieParser } from '../schema/login/utils/login-functions'

const verifyJwtToken = async (token) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    const userApi = new UsersApi()
    userApi.initialize({})
    const foundUser = await userApi.getUser(userId)

    if (foundUser.token !== token) {
      return ''
    }

    return userId
  } catch (e) {
    return ''
  }
}

const authorizeBearerToken = async (req) => {
  const { headers } = req
  const { authorization } = headers

  try {
    const [_bearer, token] = authorization.split(' ')

    return await verifyJwtToken(token)
  } catch (e) {
    return ''
  }
}

export const context = async ({ req, res }) => {
  const loggedUserId = await authorizeBearerToken(req)

  if (!loggedUserId) {
    const cookies = req.headers.cookie

    if (cookies) {
      const { jwtToken } = cookieParser(cookies)
      const userId = verifyJwtToken(jwtToken)
      return {
        loggedUserId: userId,
        res
      }
    }
  }

  return {
    loggedUserId,
    res
  }
}