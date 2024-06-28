import { IUserRepository } from '@/core/domain/contracts/IUserRepository';
import { User } from '@/core/domain/entities/User';
import { UserModel } from '@/models/UserModels';

export class UserRepository implements IUserRepository {
    async searchUsers(searchQ: string, page: number): Promise<{ count: number; users: User[] }> {
        let counts:number;
        let user:User[];
        counts =1;
        user = []
        return { count:counts, users:user}
    }
    async save(user: User): Promise<User> {
        const newUser:any = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async findById(id: string): Promise<User | null> {
        return UserModel.findById(id);
    }

    async findAll(): Promise<User[]> {
        return UserModel.find();
    }

    async update(user: User): Promise<User | null> {
        return UserModel.findByIdAndUpdate(user.id, user, { new: true });
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}