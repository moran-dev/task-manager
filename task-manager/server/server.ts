import { ApolloServer, gql } from 'apollo-server';

// Definindo o esquema GraphQL
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task!]
  }

  type Mutation {
    addTask(title: String!): Task!
  }
`;

// Resolvers para as queries e mutations
const resolvers = {
  Query: {
    tasks: () => [
      { id: 1, title: "Learn Apollo", completed: true },
      { id: 2, title: "Build GraphQL API", completed: false },
    ],
  },
  Mutation: {
    addTask: (_, { title }) => {
      const newTask = { id: Math.random().toString(), title, completed: false };
      return newTask;
    },
  },
};

// Cria a instância do Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "http://localhost:3000", // Permite requisições do frontend (React)
    credentials: true,
  },
});

// Inicia o servidor e escuta na porta 4000
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
