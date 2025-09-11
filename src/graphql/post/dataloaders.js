import DataLoader from 'dataloader'

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&userId=')
    const url = '?userId=' + urlQuery
    const response = await getPosts(url)
    return ids.map(id => {
      return response.filter(post => post.userId === id)
    })
  })
}