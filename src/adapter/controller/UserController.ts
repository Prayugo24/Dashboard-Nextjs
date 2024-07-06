import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '@/repositories/UserRepository';
import { SearchUsersById } from '@/services/user/SearchUserById';
import { GetAllUsers } from '@/services/user/GetAllUsers';
import { DeleteUserById } from '@/core/services/user/DeleteUserById';
import { User } from '@/core/domain/entities/User';
import { UpdateUsers } from '@/core/services/user/UpdateUsers';


const userRepository = new UserRepository();

export class UserController {
    static async getUserById(userId: string, request: NextRequest) {
        try {
          const users = new SearchUsersById(userRepository);
          const getUsers = await users.execute(userId);
          return NextResponse.json({ status: 200, message:"Success Get Users",data:getUsers});
        } catch (error) {
            console.error('Error get user:', error);
            return NextResponse.json({ status: 500, message: 'Failed to fetch users' });
        }
    }

    static async getAllUser(request: NextRequest) {
        try{
            const keyword = request.nextUrl.searchParams.get('keyword') || '';
            const page = request.nextUrl.searchParams.get('page') || '1';
            const users = new GetAllUsers(userRepository);
            const getUsers = await users.execute(keyword, page)
            return NextResponse.json({ status: 200, message:"Success Get Users", data:getUsers});
        } catch (error) {
            console.error('Error get all user:', error);
            return NextResponse.json({ status: 500,message: 'Failed to fetch users' });
        }
    }

    static async deleteUsersById(userId: string, request:NextRequest) {
        try {
            const users = new DeleteUserById(userRepository)
            await users.execute(userId)
            return NextResponse.json({ status: 200, message:"Success delete users", userId});
        } catch (error) {
            console.error('Error deleting user:', error);
            return NextResponse.json({ status: 500, message: 'Failed to delete user' });
        }
    }

    static async updateUser(userId: string, request: NextRequest) {
        try {
            const { username, email, phone, password, 
                address, isAdmin, isActive } = await request.json();
            const user: User = {
                id: userId,
                username,
                email,
                phone,
                password,
                address,
                isAdmin,
                isActive
            };
            const users = new UpdateUsers(userRepository)
            const updatedUser = await users.execute(user);

            if (updatedUser) {
                return NextResponse.json(updatedUser, { status: 200 });
            } else {
                return NextResponse.json({ message: 'User not found or not updated' }, { status: 404 });
            }

        } catch (error) {
            console.error('Error updating user:', error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
    static async addUsers(request: NextRequest) {

    }
    
}