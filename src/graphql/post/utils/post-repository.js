import { ValidationError } from "apollo-server"

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource)
  const { title, body, userId } = postInfo

  if (!title || !body || !userId) {
    throw new ValidationError('Missing fields')
  }

  return await dataSource.post('', {
    ...postInfo
  })
}

export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) {
    throw new ValidationError('Missing post ID')
  }

  if (postData?.userId) {
    await userExists(postData.userId, dataSource)
  }

  return await dataSource.patch(postId, {
    ...postData
  })
}

export const deletePostFn = async (postId, dataSource) => {
  if (!postId) {
    throw new ValidationError('Missing post ID')
  }

  await postExists(postId, dataSource)

  const deleted = await dataSource.delete(postId)

  return !!deleted
}

const postExists = async (postId, dataSource) => {
  try {
    await dataSource.getPost(postId)
  } catch (e) {
    throw new ValidationError(`Post ${postId} not found`)
  }
}

const userExists = async (userId, dataSource) => {
  try {
    const userApi = dataSource.context.dataSources.userApi
    await userApi.getUser(userId)
  } catch (e) {
    throw new ValidationError(`User ${userId} not found`)
  }
}

const createPostInfo = async (postData, dataSource) => {
  const { title, body, userId } = postData

  await userExists(userId, dataSource)

  const lastPostByIndexRef = await dataSource.getPosts({
    _limit: 1,
    _sort: '-indexRef',
  })

  const indexRef = lastPostByIndexRef[0].indexRef + 1

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString()
  }
}