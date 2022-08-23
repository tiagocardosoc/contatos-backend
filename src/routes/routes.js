import { Router } from "express";
import contatos from "./contatos";
import usuario from "./usuario";

const routes = Router()

routes.use(usuario);
routes.use(contatos);

export default routes;
