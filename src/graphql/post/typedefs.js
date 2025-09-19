import { gql } from "apollo-server";

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    updatePost(postId: ID!, data: UpdatePostInput!): Post!
    deletePost(postId: ID!): Boolean!
  }

  union PostResult = PostNotFoundError | Post

  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
  }

  type Post {
    id: String!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    userId: String
  }
`