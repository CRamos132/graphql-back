import { gql } from "apollo-server";

export const loginTypedefs = gql`
  extend type Mutation {
    login(data: LoginInput!): Login!
    logout(userId: ID!): Boolean!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Login {
    userId: String!
    token: String!
  }
`