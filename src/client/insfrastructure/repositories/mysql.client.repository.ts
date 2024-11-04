import { query } from "../databases/mysql";
import Client from "../../domain/client"; 
import { ClientRepository } from "../../domain/client-repository"; 

export class MySQLClientRepository implements ClientRepository {

    constructor() {
        this.createTablesIfNotExist();
    }
    
    private async createTablesIfNotExist(): Promise<void> {
        const createUsuariosTableSQL = `
        CREATE TABLE IF NOT EXISTS Usuarios (
            id_usuario INT AUTO_INCREMENT PRIMARY KEY,
            uuid VARCHAR(36) NOT NULL UNIQUE,
            nombre VARCHAR(255) NOT NULL,
            apellido_pa VARCHAR(255) NOT NULL,
            apellido_ma VARCHAR(255),
            sexo ENUM('M', 'F') NOT NULL,
            correo VARCHAR(255) NOT NULL,
            contrasena VARCHAR(255) NOT NULL,
            telefono VARCHAR(20),
            fecha_nacimiento DATE
        );
        `;
    
        const createClientesTableSQL = `
        CREATE TABLE IF NOT EXISTS Clientes (
            id_cliente INT PRIMARY KEY,
            FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
        );
        `;
    
        try {
          // Asegúrate de pasar un array vacío como segundo argumento
        await query(createUsuariosTableSQL, []);
        await query(createClientesTableSQL, []);
        console.log("Las tablas de cliente fueron creadas o ya existían.");
        } catch (error) {
        console.error("Error al crear las tablas:", error);
        }
    }
    






  // List all clients
async getAll(): Promise<Client[]> {
    const sql = `
    SELECT u.* 
    FROM Usuarios u
    JOIN Clientes c ON u.id_usuario = c.id_cliente
    `;
    const rows = await query(sql, []) as any[];

    return rows.map((row: any) => new Client(
    row.id_usuario,
    row.uuid,
    row.nombre,
    row.apellido_pa,
    row.apellido_ma,
    row.sexo,
    row.correo, // Ensure this matches the Client class
    row.contrasena,
    row.telefono,
    row.fecha_nacimiento
    ));
}

  // Create a new client
async create(user: Client): Promise<Client> {
    const sqlUsuarios = `
    INSERT INTO Usuarios (uuid, nombre, apellido_pa, apellido_ma, sexo, correo, contrasena, telefono, fecha_nacimiento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const paramsUsuarios = [
    user.uuid,
    user.nombre,
    user.apellido_pa,
    user.apellido_ma,
    user.sexo,
    user.correo,
    user.contrasena,
    user.telefono,
    user.fecha_nacimiento
    ];

    try {
    const result: any = await query(sqlUsuarios, paramsUsuarios);
    const clientId = result.insertId;

    const sqlClientes = `INSERT INTO Clientes (id_cliente) VALUES (?)`;
    await query(sqlClientes, [clientId]);

    return new Client(
        clientId,
        user.uuid,
        user.nombre,
        user.apellido_pa,
        user.apellido_ma,
        user.sexo,
        user.correo,
        user.contrasena,
        user.telefono,
        user.fecha_nacimiento
    );
    } catch (error) {
    console.error("Error in creating client:", error);
    throw error;
    }
}

  // Get a client by their ID
async getClientById(uuid: string): Promise<Client | null> {
    const sql = `
    SELECT u.* 
    FROM Usuarios u
    JOIN Clientes c ON u.id_usuario = c.id_cliente
    WHERE u.uuid = ?
    `;
    const params = [uuid];
    const rows = await query(sql, params) as any[];

    if (rows.length === 0) {
    return null;
    }

    const row = rows[0];
    return new Client(
    row.id_usuario,
    row.uuid,
    row.nombre,
    row.apellido_pa,
    row.apellido_ma,
    row.sexo,
    row.correo,
    row.contrasena,
    row.telefono,
    row.fecha_nacimiento
    );
}

  // Update a client
async updateClient(uuid: string, newClient: Partial<Client>): Promise<Client | null> {
    const sqlUsuarios = `
    UPDATE Usuarios 
    SET 
    nombre = COALESCE(?, nombre),
    apellido_pa = COALESCE(?, apellido_pa),
    apellido_ma = COALESCE(?, apellido_ma),
    sexo = COALESCE(?, sexo),
    correo = COALESCE(?, correo),
    telefono = COALESCE(?, telefono),
    fecha_nacimiento = COALESCE(?, fecha_nacimiento)
    WHERE uuid = ?
    `;
    const paramsUsuarios = [
    newClient.nombre,
    newClient.apellido_pa,
    newClient.apellido_ma,
    newClient.sexo,
    newClient.correo,
    newClient.telefono,
    newClient.fecha_nacimiento,
    uuid
    ];
    await query(sqlUsuarios, paramsUsuarios);

    return await this.getClientById(uuid); // Return the updated client
}

  // Delete a client
async deleteClient(uuid: string): Promise<boolean> {
    // Delete from Clientes table
    const sqlClientes = `
    DELETE FROM Clientes 
    WHERE id_cliente = (SELECT id_usuario FROM Usuarios WHERE uuid = ?)
    `;
    await query(sqlClientes, [uuid]);

    // Delete from Usuarios table
    const sqlUsuarios = `DELETE FROM Usuarios WHERE uuid = ?`;
    const result: any = await query(sqlUsuarios, [uuid]);

    return result.affectedRows > 0;
}
}
