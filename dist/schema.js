"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.DateTime = void 0;
const nexus_1 = require("nexus");
const path_1 = require("path");
const graphql_scalars_1 = require("graphql-scalars");
exports.DateTime = (0, nexus_1.asNexusMethod)(graphql_scalars_1.DateTimeResolver, 'date');
const Query = (0, nexus_1.objectType)({
    name: 'Query',
    definition(t) {
        t.field('bookById', {
            type: 'Book',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve: async (_parent, args, context) => {
                return await context.prisma.book.findUnique({
                    where: { id: args.id },
                });
            },
        });
    },
});
const Author = (0, nexus_1.objectType)({
    name: 'Author',
    definition(t) {
        t.nonNull.string('id'),
            t.nonNull.string('firstName'),
            t.nonNull.string('lastName');
    },
});
const Book = (0, nexus_1.objectType)({
    name: 'Book',
    definition(t) {
        t.nonNull.string('id'),
            t.nonNull.string('title'),
            t.nonNull.field('releaseDate', { type: 'DateTime' });
        t.field('author', {
            type: 'Author',
            resolve: async (parent, _, context) => {
                return await context.prisma.book
                    .findUnique({
                    where: { id: parent.id },
                })
                    .author();
            },
        });
    },
});
exports.schema = (0, nexus_1.makeSchema)({
    types: [Book, Author, Query, exports.DateTime],
    outputs: {
        typegen: (0, path_1.join)(__dirname, '..', 'nexus-typegen.ts'), // 2
        schema: (0, path_1.join)(__dirname, '..', 'schema.graphql'), // 3
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
});
