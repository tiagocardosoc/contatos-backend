import { Router } from "express";
import contatos from "./contatos";
import usuario from "./usuario";

const routes = Router()

// Public Route
// routes.get('/', (req, res) => {
//     res.status(200).json({
//         mensage: 'Conectado a API!'
//     })
// })

routes.use(usuario);
routes.use(contatos);

export default routes;
