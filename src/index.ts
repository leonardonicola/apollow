import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { Context, createContext } from './context'

const server = new ApolloServer<Context>({ schema })

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: createContext,
  })
  console.log(`🚀 Server ready at: ${url}`)
}
start()
