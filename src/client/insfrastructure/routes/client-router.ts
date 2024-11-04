import express from "express";
import { ClientControllerIntance } from "../dependencies";

const clientRouter = express.Router();


clientRouter.post("/", ClientControllerIntance.create.bind(ClientControllerIntance));
clientRouter.get("/", ClientControllerIntance.getAll.bind(ClientControllerIntance));
clientRouter.get("/:id", ClientControllerIntance.getById.bind(ClientControllerIntance));
clientRouter.put("/:id", ClientControllerIntance.update.bind(ClientControllerIntance));
clientRouter.delete("/:id", ClientControllerIntance.delete.bind(ClientControllerIntance));

export { clientRouter };
