import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
export default  {
    migrations:{
        path:path.join(__dirname,"./migrations"),
    },
    allowGlobalContext:true,
    type:"postgresql",
    entities: [Post,User],
    dbName: 'social_db',
    user: 'social',
    password: 'social',
    host: 'localhost',
    port: 5433,
    debug: !__prod__,
 
} as Parameters<typeof MikroORM.init>[0];