import { ApolloServer } from 'apollo-server'
import { resolvers, typeDefs } from './graphql/schema/index'
import { context } from './graphql/context/index'
import { PostsApi } from './graphql/schema/post/datasources'
import { UsersApi } from './graphql/schema/user/datasources'
import { LoginApi } from './graphql/schema/login/datasources'

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
  },
  uploads: false,
  cors: {
    credentials: true,
    origin: ['http://localhost:3030', 'https://studio.apollographql.com']
  },
})

server.listen(4003)