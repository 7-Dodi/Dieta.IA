//Importações
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";

//Controller
import { CreateNutritionController } from "./Controller/CreateNutritionController";

//Rotas
export async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply)=>{
        return new CreateNutritionController().handle(request, reply)
    })
}