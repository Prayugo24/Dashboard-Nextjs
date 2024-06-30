import { NextRequest } from 'next/server';
import { UserController } from '@/controller/UserController';

export async function GET(request: NextRequest) {
    return UserController.getAllUser(request)
}

export async function POST(request: NextRequest) {

}