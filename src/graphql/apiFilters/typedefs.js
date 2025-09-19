import { gql } from "apollo-server";

export const apiFilterTypedefs = gql`
  input ApiFiltersInput {
    _sort: String
    _start: Int
    _limit: Int
  }
`