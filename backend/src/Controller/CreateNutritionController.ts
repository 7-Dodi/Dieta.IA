//Importações
import { FastifyRequest, FastifyReply} from "fastify";

//Service
import { CreateNutritionService } from "../Services/CreateNutritionService";

//Tipagem
import {DataProps} from "../Types/DataPropsBody";

//Function
class CreateNutritionController {
    async handle (request: FastifyRequest, reply: FastifyReply){
        const { name, weight, height, age, gender, objective, level} = request.body as DataProps;

        const createNutrition = new CreateNutritionService();
        const nutrition = await createNutrition.execute({
            name, weight, height, age, gender, objective, level
        });

        reply.send(nutrition);
    }
};

export {CreateNutritionController};