import { gql } from "apollo-server";

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
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
`