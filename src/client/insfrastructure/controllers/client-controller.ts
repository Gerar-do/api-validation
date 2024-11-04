
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcrypt';
import CreateClientUseCase from '../../application/create-client-usecase';
import GetClientListUseCase from '../../application/get-clientList-usecase';
import { GetClientByID } from '../../application/get-clientById-usecase';
import UpdateClientUseCase from '../../application/update-client-usecase';
import DeleteClientUseCase from '../../application/delete-client-usecase';

class ClientController {
constructor(
    private getClientListUseCase: GetClientListUseCase,
    private createClientUseCase: CreateClientUseCase,
    private getClientByID: GetClientByID,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase
) { }

async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let userPayload = req.body; // Se obtiene el payload
      const uuid = uuid4(); // Generar el UUID
      const hashedPassword = await bcrypt.hash(userPayload.contrasena, 10); // Cifrar la contraseña

      // Reemplazar la contraseña cifrada y agregar el UUID en el payload
    userPayload = {
        ...userPayload,
        uuid: uuid,
        contrasena: hashedPassword,
    };

    const user = await this.createClientUseCase.execute(userPayload);
    res.status(201).json(user);
    } catch (error) {
    next(error);
    }
}

async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    const users = await this.getClientListUseCase.execute();
    res.json(users);
    } catch (error) {
    next(error);
    }
}

async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    const user = this.getClientByID.run(req.params.id);
    res.json(user);
    } catch (error) {
    next(error);
    }
}

async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    const userId = req.params.id;
    const userPayload = req.body;
    const updatedUser = await this.updateClientUseCase.execute(userId, userPayload);
    res.json(updatedUser);
    } catch (error) {
    next(error);
    }
}

async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    const userId = req.params.id;
    const result = await this.deleteClientUseCase.execute(userId);
    res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
    next(error);
    }
}

}

export default ClientController;
