import { RESTDataSource } from "apollo-datasource-rest";
import { makePostDataLoader } from "./dataloaders";

export class PostsApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.API_URL + '/posts'
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this))
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams)
  }

  async getPost(id) {
    return this.get(id)
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id)
  }
}