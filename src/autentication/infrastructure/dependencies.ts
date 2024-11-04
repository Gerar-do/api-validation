import { AuthController } from "./controllers/auth-controller";
import { MySQLAuthRepository } from "./repositories/mysql-auth-repository";
import { JWTTokenService } from "./jwt-token-service";
import { LoginUseCase } from "../application/login-usecase";
import { LogoutUseCase } from "../application/logout-usecase";

const secretKey = process.env.JWT_SECRET || "supersecretkey";

const authRepository = new MySQLAuthRepository(); // O MongoAuthRepository según sea necesario
const tokenService = new JWTTokenService(secretKey);

const loginUseCase = new LoginUseCase(authRepository, tokenService);
const logoutUseCase = new LogoutUseCase();

const authController = new AuthController(loginUseCase, logoutUseCase);

export { authController };