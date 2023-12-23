import {
  asNexusMethod,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { join } from 'path'
import { Context } from './context'
import { DateTimeResolver } from 'graphql-scalars'
import { BookService } from './services/book'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('bookById', {
      type: 'Book',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const bookServices = new BookService(context)
        return await bookServices.findById(args.id)
      },
    })
  },
})

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.nonNull.string('id'),
      t.nonNull.string('firstName'),
      t.nonNull.string('lastName')
  },
})

const Book = objectType({
  name: 'Book',
  definition(t) {
    t.nonNull.string('id'),
      t.nonNull.string('title'),
      t.nonNull.field('releaseDate', { type: 'DateTime' })
    t.field('author', {
      type: 'Author',
      resolve: async (parent, _, context: Context) => {
        return await context.prisma.book
          .findUnique({
            where: { id: parent.id },
          })
          .author()
      },
    })
  },
})

export const schema = makeSchema({
  types: [Book, Author, Query, DateTime],
  outputs: {
    typegen: join(__dirname, 'generated/nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
