const post = async (_, { id }, { dataSources }) => {
  const response = await dataSources.postApi.getPost(id)

  if (typeof response.id === 'undefined') {
    return {
      statusCode: 404,
      message: 'Post not found!',
    };
  }

  return response;
}

const posts = async (_, { input }, { dataSources }) => {
  const response = await dataSources.postApi.getPosts(input)
  return response
}

const unixTimestamp = (parent) => {
  const baseDate = parent.createdAt
  const formattedDate = new Date(baseDate)
  const dateInSeconds = formattedDate.getTime() / 1000
  return Math.floor(dateInSeconds)
}

const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadByUserId(userId)
}

export const postResolvers = {
  Query: {
    posts,
    post
  },
  Post: { unixTimestamp, user },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.id === 'undefined') {
        return 'PostNotFoundError'
      }
      if (obj.id) {
        return 'Post'
      }
      return null
    }
  },
  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') {
        return 'PostNotFoundError'
      }
      return null
    }
  }
}