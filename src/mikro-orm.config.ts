import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
export default  {
    type:"postgresql",
    entities: [Post],
    dbName: 'social_db',
    user: 'social',
    password: 'social',
    host: 'localhost',
    port: 5433,
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];