import {AuthUser} from '@/core/domain/entities/AuthUser'

export interface IAuthService {
    login(username: string, password: string): Promise<AuthUser | null>;
}