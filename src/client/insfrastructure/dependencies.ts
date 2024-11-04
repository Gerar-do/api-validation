import CreateClientUseCase from "../application/create-client-usecase";
import DeleteClientUseCase from "../application/delete-client-usecase";
import { GetClientByID } from "../application/get-clientById-usecase";
import GetClientListUseCase from "../application/get-clientList-usecase";
import UpdateClientUseCase from "../application/update-client-usecase";
import ClientController from "./controllers/client-controller";
import { RepositoryFactory } from "./repository";

const ClientFactoryRepository = RepositoryFactory.createClientRepository(); 
// const mySqlUserReposritory = new MySQLUserRepository();

export const getClientListUseCase = new GetClientListUseCase(
ClientFactoryRepository
); 

export const createClientUseCase = new CreateClientUseCase(
ClientFactoryRepository
);

export const getClientById = new GetClientByID(
ClientFactoryRepository
);

export const updateClient = new UpdateClientUseCase(
ClientFactoryRepository
);

export const deleteClient = new DeleteClientUseCase(
ClientFactoryRepository
);

export const ClientControllerIntance =  new ClientController(getClientListUseCase, createClientUseCase, getClientById, updateClient, deleteClient); 