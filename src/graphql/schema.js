import { gql } from "apollo-server"
import { postResolvers } from "./post/resolvers"
import { postTypeDefs } from "./post/typedefs"
import { userResolvers } from "./user/resolvers"
import { userTypeDefs } from "./user/typedefs"
import { apiFilterTypedefs } from "./apiFilters/typedefs"
import { loginTypedefs } from "./login/typedefs"
import { loginResolvers } from "./login/resolvers"

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`

const rootResolvers = {
  Query: {
    _empty: () => true
  }
}

export const typeDefs = [rootTypeDefs, userTypeDefs, postTypeDefs, apiFilterTypedefs, loginTypedefs]
export const resolvers = [rootResolvers, userResolvers, postResolvers, loginResolvers]