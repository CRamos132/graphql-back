import { gql } from "apollo-server"
import { postResolvers } from "./post/resolvers"
import { postTypeDefs } from "./post/typedefs"
import { userResolvers } from "./user/resolvers"
import { userTypeDefs } from "./user/typedefs"
import { apiFilterTypedefs } from "./apiFilters/typedefs"
import { apiFiltersResolvers } from "./apiFilters/resolvers"

const rootTypeDefs = gql`
    type Query {
      _empty: Boolean
    }
`

const rootResolvers = {
  Query: {
    _empty: () => true
  }
}

export const typeDefs = [rootTypeDefs, userTypeDefs, postTypeDefs, apiFilterTypedefs]
export const resolvers = [rootResolvers, userResolvers, postResolvers, apiFiltersResolvers]