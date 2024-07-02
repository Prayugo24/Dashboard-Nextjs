import { ApplicationException } from '@/adapter/exceptions/ApplicationException';
import { IAuthService } from '@/core/domain/contracts/IAuthService';
import { IUserRepository } from '@/core/domain/contracts/IUserRepository';
import {AuthUser, ReqAuth} from '@/core/domain/entities/AuthUser'
import bcrypt from "bcrypt";
import { encrypt } from '@/utils/jwtHelpers';

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository){}
    
    async login(request: ReqAuth): Promise<AuthUser | null> {
        this.validateRequest(request);
        console.log(request)
        const user = await this.userRepository.findOne(request.username);
        if (!user) {
            throw new ApplicationException("User not found.","NotFound");
        }

        await this.validatePassword(request.password, user.password);

        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
        const mapUser = this.mapUser(user);

        const token = await encrypt({ mapUser, expires });

        const response: AuthUser = {
            ...mapUser,
            token,
            status: "Success",
        };

        return response;
    }

    private validateRequest(request: ReqAuth): void {
        if (!request.username) {
            throw new ApplicationException("Username cannot be empty.",'BadRequest');
        }
        if (!request.password) {
            throw new ApplicationException("Password cannot be empty.", 'BadRequest');
        }
    }

    private async validatePassword(inputPassword: string, storedPassword: string): Promise<void> {
        const isPasswordCorrect = await bcrypt.compare(inputPassword, storedPassword);
        console.log(inputPassword)
        console.log(storedPassword)
        if (!isPasswordCorrect) {
            throw new ApplicationException("Invalid credentials.","Unauthorized");
        }
    }

    private mapUser(user: any): { username: string, email: string, isAdmin: boolean } {
        return {
            username: user.username || "",
            email: user.email,
            isAdmin: user.isAdmin,
        };
    }

}
