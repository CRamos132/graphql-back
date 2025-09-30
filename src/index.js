import { ApolloServer } from 'apollo-server'
import { resolvers, typeDefs } from './graphql/schema'
import { context } from './graphql/context'
import { PostsApi } from './graphql/post/datasources'
import { UsersApi } from './graphql/user/datasources'
import { LoginApi } from './graphql/login/datasources'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi()
    }
  }
})

server.listen(4003)