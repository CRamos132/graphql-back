const user = async (_, { id }, { dataSources }) => {
  const data = await dataSources.userApi.getUser(id)
  return data
}

const users = async (_, { input }, { dataSources }) => {
  const response = await dataSources.userApi.getUsers(input)
  return response
}

const posts = async ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadByUserId(id)
}

// Mutation resolvers
const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data)
}

const updateUser = async (_, { userId, data }, { dataSources }) => {
  return dataSources.userApi.updateUser(userId, data)
}

const deleteUser = async (_, { userId }, { dataSources }) => {
  return dataSources.userApi.deleteUser(userId)
}

export const userResolvers = {
  Query: {
    user,
    users
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser
  },
  User: {
    posts
  }
}