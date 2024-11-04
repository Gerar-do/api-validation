import { AuthRepository } from "../domain/auth-repository";
import { TokenService } from "../domain/token-service";

export class LoginUseCase {
constructor(private authRepository: AuthRepository, private tokenService: TokenService) {}

async execute(email: string, password: string): Promise<string> {
    const user = await this.authRepository.validateUser(email, password);
    if (!user) {
    throw new Error("Invalid email or password");
    }
    return this.tokenService.generateToken(user.id, user.tipo_usuario);
}
}