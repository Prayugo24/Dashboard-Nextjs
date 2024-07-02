import {AuthUser, ReqAuth} from '@/core/domain/entities/AuthUser'

export interface IAuthService {
    login(request: ReqAuth): Promise<AuthUser | null>;
}