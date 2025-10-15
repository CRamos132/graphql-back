import { AuthenticationError } from "apollo-server"

export const checkIsLoggedIn = (loggedUserId) => {
  if (!loggedUserId) {
    throw new AuthenticationError('User not logged in')
  }
}

export const checkOwner = (userId, loggedUserId) => {
  checkIsLoggedIn(loggedUserId)
  if (loggedUserId !== userId) {
    throw new AuthenticationError('Action not permitted')
  }
}