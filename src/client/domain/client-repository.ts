import Client from './client';

export interface ClientRepository {
  // Método para obtener todos los usuarios
getAll(): Promise<Client[]>;

  // Método para crear un nuevo usuario
create(client: Client): Promise<Client>;

  // Método para obtener un usuario por ID
getClientById(clientId: string): Promise<Client | null>;

  // Método para actualizar un usuario por ID
updateClient(clientId: string, client: Partial<Client>): Promise<Client | null>;

  // Método para eliminar un usuario por ID
deleteClient(clientId: string): Promise<boolean>;
}

export default ClientRepository;
