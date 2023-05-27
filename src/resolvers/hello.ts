import { Resolver ,Query} from "type-graphql";

@Resolver()
export class HelloResolver{
    @Query(() => String) // Provide explicit GraphQL type for the field
    hello(){
        return "Hello World"
    }

}