import { IUserRepository } from '@/contracts/IUserRepository';
import { NextRequest,NextResponse } from 'next/server';

export class GetAllUsers {
    private readonly ITEM_PER_PAGE: number = 2; 

    constructor(private userRepository: IUserRepository){}

    async execute(keyword: string, page:string) {
        const regex = new RegExp(keyword || '', 'i');
        const currentPage = parseInt(page || '1', 10) || 1;
        if (isNaN(currentPage) || currentPage < 1) {
            throw new Error('Invalid page number');
        }
        const getAllUser =  await this.userRepository.findUser(regex, currentPage,this.ITEM_PER_PAGE)
        console.log(getAllUser)
        return { count: getAllUser.counts, users:getAllUser.users};
    }
}