import { checkOwner } from "./utils/login-functions"

const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data
  return dataSources.loginApi.login(userName, password)
}

const logout = async (_, { userId }, { dataSources, loggedUserId }) => {
  checkOwner(userId, loggedUserId)
  return dataSources.loginApi.logout(userId)
}

export const loginResolvers = {
  Mutation: {
    login,
    logout
  }
}