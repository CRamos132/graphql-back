import { RESTDataSource } from "apollo-datasource-rest";
import { makeUserDataLoader } from "./dataloaders";
import { createUserFn, deleteUserFn, updateUserFn } from "./utils/users-repository";

export class UsersApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_URL + '/users'
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this))
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams)
  }

  async getUser(id) {
    return this.get(id)
  }

  async createUser(data) {
    return await createUserFn(data, this)
  }

  async updateUser(userId, data) {
    return await updateUserFn(userId, data, this)
  }

  async deleteUser(userId) {
    return await deleteUserFn(userId, this)
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id)
  }
}