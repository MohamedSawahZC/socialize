import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
import path from "path";
export default  {
    type:"postgresql",
    entities: [Post],
    dbName: 'social_db',
    user: 'social',
    password: 'social',
    host: 'localhost',
    port: 5433,
    debug: !__prod__,
    migrations:{
        path:path.join(__dirname,"./migrations"),
    }
} as Parameters<typeof MikroORM.init>[0];