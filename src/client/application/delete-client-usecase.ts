import { ClientRepository } from '../domain/client-repository';

class DeleteClientUseCase {
constructor(private clientRepository: ClientRepository) {}

async execute(clientId: string): Promise<boolean> {
    const result = await this.clientRepository.deleteClient(clientId);

    if (!result) {
    this.handleError(clientId);
    }

    this.logSuccess(clientId);
    return result; // Returns a boolean indicating success
}

private handleError(clientId: string): void {
    throw new Error(`No se pudo eliminar el cliente con id: ${clientId}`);
}

private logSuccess(clientId: string): void {
    console.log(`Cliente con id: ${clientId} ha sido eliminado`);
}
}

export default DeleteClientUseCase;
