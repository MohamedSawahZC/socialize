import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express/dist/ApolloServer";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import 'reflect-metadata';
import { UserResolver } from "./resolvers/user";

const main = async () => {
  // 1) Initialize orm
  const orm = await MikroORM.init(mikroOrmConfig);
  
  // 2) Initialize migrations
  await orm.getMigrator().up();

  // 3) Express instance 
  const app = express();

  // 4) Config Apollo Server
  const apolloServer =  new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver,PostResolver,UserResolver],
      validate: true,
    }),
    context:()=>({em:orm.em})
  });

  await apolloServer.start(); // Await the start method

  apolloServer.applyMiddleware({ app });

  // 5) Run server
  app.listen(4000, () => {
    console.log("⚡ Server is running on port 4000 ⚡");
  });
};

main().catch((e) => {
  console.error(e);
});
