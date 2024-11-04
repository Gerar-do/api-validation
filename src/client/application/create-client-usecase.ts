import { ClientRepository } from '../domain/client-repository';
import Client from '../domain/client';

class CreateClientUseCase {
  // Constructor para inicializar el repositorio de clientes
constructor(private clientRepository: ClientRepository) {}

  // Método para ejecutar la creación de un cliente
async execute(clientPayload: Omit<Client, 'id'>): Promise<Client> {
    // Crear una nueva instancia de Client sin la propiedad 'id'
    const client = this.crearInstanciaCliente(clientPayload);

    // Guardar el nuevo cliente creado en el repositorio
    return this.clientRepository.create(client);
}

  // Método privado para instanciar un nuevo objeto Client
private crearInstanciaCliente(clientPayload: Omit<Client, 'id'>): Client {
    return new Client(
      null, // 'id' se establece en null, ya que será generado por la base de datos
      clientPayload.uuid, // Usar el UUID proporcionado
      clientPayload.nombre, // Nombre del cliente
      clientPayload.apellido_pa, // Apellido paterno del cliente
      clientPayload.apellido_ma, // Apellido materno del cliente
      clientPayload.sexo, // Género del cliente
      clientPayload.correo, // Correo electrónico del cliente
      clientPayload.contrasena, // Pasar la contraseña cifrada
      clientPayload.telefono, // Número de teléfono del cliente
      clientPayload.fecha_nacimiento // Fecha de nacimiento del cliente
    );
}
}

export default CreateClientUseCase;
