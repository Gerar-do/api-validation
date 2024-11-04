import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/login-usecase';
import { LogoutUseCase } from '../../application/logout-usecase';

export class AuthController {
    constructor(
        private loginUseCase: LoginUseCase,
        private logoutUseCase: LogoutUseCase
    ) {}

    async login(req: Request, res: Response): Promise<Response> {
        const { correo, contrasena } = req.body;
        
        // Validación básica de los campos de entrada
        if (!correo || !contrasena) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos" });
        }

        try {
            const token = await this.loginUseCase.execute(correo, contrasena);
            return res.status(200).json({ correo, token });
        } catch (error: any) {
            if (error.message === "Invalid credentials") {
                return res.status(401).json({ message: "Correo o contraseña incorrectos" });
            }
            return res.status(500).json({ message: "Error del servidor", error: error.message });
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        try {
            await this.logoutUseCase.execute();
            return res.status(200).json({ message: "Cierre de sesión exitoso" });
        } catch (error: any) {
            return res.status(500).json({ message: "Error al cerrar sesión", error: error.message });
        }
    }
}
