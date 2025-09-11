import DataLoader from 'dataloader'

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&id=')
    const url = '?id=' + urlQuery
    const users = await getUsers(url)
    return ids.map(id => users.find(user => user.id === id))
  })
}
