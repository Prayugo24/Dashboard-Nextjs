import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '@/repositories/UserRepository';
import { SearchUsersById } from '@/services/user/SearchUserById';
import { GetAllUsers } from '@/services/user/GetAllUsers';


const userRepository = new UserRepository();

export class UserController {
    static async getUserById(userId: string, req: NextRequest) {
        try {
          const users = new SearchUsersById(userRepository);
          const getUsers = await users.execute(userId);
          return NextResponse.json({ status: 200, message:"Success Get Users",data:getUsers});
        } catch (error) {
            return NextResponse.json({ status: 500, message: 'Failed to fetch users' });
        }
      }

    static async getAllUser(request: NextRequest) {
        try{
            const keyword = request.nextUrl.searchParams.get('keyword') || '';
            const page = request.nextUrl.searchParams.get('page') || '1';
            const users = new GetAllUsers(userRepository);
            const getUsers = await users.execute(keyword, page)
            console.log(getUsers)
            return NextResponse.json({ status: 200, message:"Success Get Users", data:getUsers});
        } catch (error) {
            return NextResponse.json({ status: 500,message: 'Failed to fetch users' });
        }
    }
    
}