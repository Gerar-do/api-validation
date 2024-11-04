import Client from '../domain/client';
import { ClientRepository } from '../domain/client-repository';

class ListClientsUseCase {
constructor(private readonly clientRepository: ClientRepository) {}

  // Método principal para obtener todos los clientes
async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.getAll(); // Obtiene la lista de clientes
    return clients; // Devuelve la lista de clientes
}
}

export default ListClientsUseCase;
