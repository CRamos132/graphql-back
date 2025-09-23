import { ValidationError } from "apollo-server"

export const createUserFn = async (userData, dataSource) => {
  const userInfo = await createUserInfo(userData, dataSource)
  const { firstName, lastName, userName } = userInfo

  const isUsernameAlreadyInUse = await userExistsByUsername(userName, dataSource)

  if (isUsernameAlreadyInUse) {
    throw new ValidationError('Username already in use')
  }

  if (!firstName || !lastName || !userName) {
    throw new ValidationError('Missing fields')
  }

  return await dataSource.post('', {
    ...userInfo
  })
}

export const updateUserFn = async (userId, userData, dataSource) => {
  if (!userId) {
    throw new ValidationError('Missing user ID')
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

const createUserInfo = async (userData, dataSource) => {
  const { firstName, lastName, userName } = userData

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
    createdAt: new Date().toISOString()
  }
}