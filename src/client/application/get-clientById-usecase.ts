import { ClientRepository } from "../domain/client-repository";

export class GetClientByID {
run(id: string) {
    throw new Error('Method not implemented.');
}
constructor(private readonly clientRepository: ClientRepository) {}

  // Método principal para ejecutar la obtención del cliente por ID
async execute(clientId: string) {
    const client = await this.findClientById(clientId);
    
    // Si el cliente existe, se imprime su información
    console.log(client);
    
    return client; // Devuelve el cliente encontrado
}

  // Método privado para encontrar un cliente por su ID
private async findClientById(clientId: string) {
    const client = await this.clientRepository.getClientById(clientId);
    
    if (!client) {
      throw new Error(`Id: ${clientId} de usuario no encontrado`); // Lanza el error si no se encuentra el cliente
    }

    return client; // Devuelve el cliente encontrado
}
}
