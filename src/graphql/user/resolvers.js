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

export const userResolvers = {
  Query: {
    user,
    users
  },
  User: {
    posts
  }
}