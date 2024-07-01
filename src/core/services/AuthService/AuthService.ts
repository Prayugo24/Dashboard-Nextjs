import { IAuthService } from '@/core/domain/contracts/IAuthService';
import {AuthUser} from '@/core/domain/entities/AuthUser'


export class AuthService implements IAuthService {
    private users: AuthUser[] = [
        { id: "1", username: 'user',email:'user@gmail.com', password: 'password', isAdmin: true },
    ];
    login(username: string, password: string): Promise<AuthUser | null> {
        const user:any = this.users.find(user => user.username === username && user.password === password);
        return user;
    }

}
