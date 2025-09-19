import { RESTDataSource } from "apollo-datasource-rest";
import { makePostDataLoader } from "./dataloaders";
import { createPostFn, deletePostFn, updatePostFn } from "./utils/post-repository";

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

  async createPost(data) {
    return await createPostFn(data, this)
  }

  async updatePost(postId, data) {
    return await updatePostFn(postId, data, this)
  }

  async deletePost(postId) {
    return await deletePostFn(postId, this)
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id)
  }
}