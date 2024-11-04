import { AuthRepository } from "../../domain/auth-repository";
import { query } from "../databases/mysql";
import bcrypt from 'bcrypt';

export class MySQLAuthRepository implements AuthRepository {
async validateUser(correo: string, contrasena: string): Promise<any> {
    // Obtiene el usuario por correo electrónico
    const sql = 'SELECT * FROM Usuarios WHERE correo_electronico = ?';
    const result: any = await query(sql, [correo]);

    if (!result || result.length === 0) {
      return null; // Usuario no encontrado
    }

    const usuario = result[0];
    // Compara la contraseña proporcionada con la contraseña hasheada almacenada
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!isMatch) {
      return null; // Contraseña incorrecta
    }

    return usuario; // Retorna el usuario si la contraseña es válida
}
}