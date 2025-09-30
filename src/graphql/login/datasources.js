import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RESTDataSource } from "apollo-datasource-rest";
import { AuthenticationError } from "apollo-server";

export class LoginApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_URL + '/users'
  }

  async login(userName, password) {
    const user = await this.get('', {
      userName
    }, {
      cacheOptions: { ttl: 0 }
    })

    const hasUser = !!user.length

    if (!hasUser) {
      throw new AuthenticationError('Username or password is not correct')
    }

    const { passwordHash, id: userId } = user[0]

    const isPasswordValid = await this.checkUserPassword(password, passwordHash)

    if (!isPasswordValid) {
      throw new AuthenticationError('Username or password is not correct')
    }

    const token = this.createJwtToken({
      userId
    })

    return {
      userId,
      token
    }
  }

  async checkUserPassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash)
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })
  }

}