export interface AuthRepository {
    validateUser(email: string, password: string): Promise<any>;
}