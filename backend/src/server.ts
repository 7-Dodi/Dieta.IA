//Importações
import Fastify from "fastify";
import cors from "@fastify/cors";
import dontenv from "dotenv";

//Rotas
import {routes} from "./routes";

//Configurações iniciais
const app = Fastify({ logger: true});
dontenv.config();

//Tratamento de erros
app.setErrorHandler((error, request, replay) => {
    replay.code(400).send({ messsage: error.message });
});

//Função para iniciar a API
const start = async () => {
    app.register(cors); //Acesso do cors
    app.register(routes); //Usando as rotas

    //Instanciando o servidor
    try {
        app.listen({ port: 5000, host: "0.0.0.0"});
        console.log("Servidor rodando na porta 5000");
    } catch (error) {
        console.error(error);
    }
};
start();