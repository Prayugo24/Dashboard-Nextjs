
import { IUserRepository } from '@/core/domain/contracts/IUserRepository';
import { User } from '@/core/domain/entities/User';

export class UpdateUsers {
    constructor(private userRepository: IUserRepository){}

    async execute(userData: User) {
        const users = {
            id:userData.id,
            username:userData.username,
            email:userData.email,
            phone:userData.phone,
            address:userData.address,
            isAdmin:userData.isAdmin,
            isActive:userData.isActive
        } as unknown as User;
        
        if (userData.password) {
            users.password = userData.password;
        }

        return this.userRepository.update(users)
    }
}