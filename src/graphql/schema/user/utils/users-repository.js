import { UserInputError, ValidationError } from "apollo-server"
import bcrypt from 'bcrypt';

export const createUserFn = async (userData, dataSource) => {
  const userInfo = await createUserInfo(userData, dataSource)
  const { firstName, lastName, userName, password } = userInfo

  const isUsernameAlreadyInUse = await userExistsByUsername(userName, dataSource)

  if (isUsernameAlreadyInUse) {
    throw new ValidationError('Username already in use')
  }

  if (!firstName || !lastName || !userName || !password) {
    throw new ValidationError('Missing fields')
  }

  validateUserPassword(password)

  const userWithPasswordHash = await validateUserHash(userInfo)

  return await dataSource.post('', {
    ...userWithPasswordHash
  })
}

export const updateUserFn = async (userId, userData, dataSource) => {
  if (!userId) {
    throw new ValidationError('Missing user ID')
  }

  if (userData?.password) {
    validateUserPassword(userData?.password)
  }

  if (userData?.userName) {
    const isUsernameAlreadyInUse = await userExistsByUsername(userData?.userName, dataSource)

    if (isUsernameAlreadyInUse) {
      throw new ValidationError('Username already in use')
    }
  }

  return await dataSource.patch(userId, {
    ...userData
  })
}

export const deleteUserFn = async (userId, dataSource) => {
  if (!userId) {
    throw new ValidationError('Missing user ID')
  }

  await userExistsById(userId, dataSource)

  const deleted = await dataSource.delete(userId)

  return !!deleted
}

const userExistsByUsername = async (userName, dataSource) => {
  const users = await dataSource.getUsers({ userName })
  return users.length
}

const userExistsById = async (userId, dataSource) => {
  try {
    await dataSource.getUser(userId)
  } catch (e) {
    throw new ValidationError(`User ${userId} not found`)
  }
}

const validateUserHash = async (user) => {
  if (user.password && !user.passwordHash) {
    const { password, ...rest } = user
    const passwordHash = await bcrypt.hash(password, 12)
    const newUserObject = {
      ...rest,
      passwordHash
    }
    return newUserObject
  }
  return user
}

const validateUserPassword = (password) => {
  // Letra minúscula, letra maiúscula e número
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;

  if (!password.match(strongPasswordRegex)) {
    throw new UserInputError(
      'Password must contain at least: ' +
      'One lower case letter, one upper case letter and one number.',
    );
  }
};

const createUserInfo = async (userData, dataSource) => {
  const { firstName, lastName, userName, password } = userData

  const lastPostByIndexRef = await dataSource.getUsers({
    _limit: 1,
    _sort: '-indexRef',
  })

  const indexRef = lastPostByIndexRef[0].indexRef + 1

  return {
    firstName,
    lastName,
    userName,
    indexRef,
    posts: [],
    password,
    createdAt: new Date().toISOString()
  }
}