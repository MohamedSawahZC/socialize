import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
import path from "path";
export default  {
    migrations:{
        path:path.join(__dirname,"./migrations"),
    },
    allowGlobalContext:true,
    type:"postgresql",
    entities: [Post],
    dbName: 'social_db',
    user: 'social',
    password: 'social',
    host: 'localhost',
    port: 5433,
    debug: !__prod__,
 
} as Parameters<typeof MikroORM.init>[0];