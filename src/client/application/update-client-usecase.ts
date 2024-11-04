import { ClientRepository } from '../domain/client-repository';
import Client from '../domain/client';

class UpdateClientUseCase {
constructor(private ClientRepository: ClientRepository) {}

async execute(clientId: string, clientPayload: Partial<Client>): Promise<Client> {
    const result = await this.ClientRepository.updateClient(clientId, clientPayload);

    if (!result) {
    throw new Error(`Id: ${clientId} de tutor no encontrada`);
    }

    return result;
}
}

export default UpdateClientUseCase;