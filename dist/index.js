"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const context_1 = require("./context");
const server = new server_1.ApolloServer({ schema: schema_1.schema });
const start = async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: context_1.createContext,
    });
    console.log(`🚀 Server ready at: ${url}`);
};
start();
