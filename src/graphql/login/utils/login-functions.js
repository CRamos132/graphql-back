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

export const cookieParser = (cookiesHeader) => {
  // The final goal is to return an object with key/value reflecting
  // the cookies. So, this functions always returns an object.

  // If we do not receive a string, we won't do anything.
  if (typeof cookiesHeader != 'string') return {};

  const cookies = cookiesHeader.split(/;\s*/);

  // If we have something similar to cookie, we want to add them
  // to the final object
  const parsedCookie = {};
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    parsedCookie[key] = value;
  }

  // The reason I'm using JSON here is to make sure the final
  // object won't have any undefined value.
  return JSON.parse(JSON.stringify(parsedCookie));
};