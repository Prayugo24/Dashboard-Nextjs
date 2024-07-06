import { IUserRepository } from '@/core/domain/contracts/IUserRepository';
import { User } from '@/core/domain/entities/User';
import { UserModel } from '@/models/UserModels';

export class UserRepository implements IUserRepository {
    async findOne(username: string): Promise<User | null> {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return null;
        }
    
        const getUser: User = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            phone: parseInt(user.phone),
            address: user.address, // Mengoreksi dari item.phone ke item.address
            isAdmin: user.isAdmin,
            isActive: user.isActive,
        };
    
        return getUser;
    }
    async save(user: User): Promise<User> {
        const newUser:any = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async findById(id: string): Promise<User | null> {
        return UserModel.findById(id);
    }

    async findUser(keyword: string | RegExp, page: number, itemPerPage:number): Promise<{ counts: number; users: User[] }> {
        if (page < 1 || itemPerPage < 1) {
            throw new Error("Page number and items per page must be greater than zero.");
        }
        const count = await UserModel.find({ username: { $regex: keyword } }).countDocuments();
        const user = await UserModel.find({ username: { $regex: keyword } })
          .limit(itemPerPage)
          .skip(itemPerPage * (page - 1));
        
        const allUsers: User[] = user.map((item: any) => ({
            id: item._id.toString(), 
            username: item.username,
            email: item.email,
            password: item.password,
            phone: item.phone,
            address: item.phone,
            isAdmin: item.isAdmin,
            isActive: item.isActive,
        }));
        return { counts:count, users:allUsers}
    }

    async update(user: User): Promise<User | null> {
        return UserModel.findByIdAndUpdate(user.id, user, { new: true });
    }

    async deleteById(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}