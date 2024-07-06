import { NextRequest } from 'next/server';
import { UserController } from '@/controller/UserController';
import { LoadDB } from '@/config/loadConnection';
LoadDB()

export async function GET(request: NextRequest) {
    return UserController.getAllUser(request)
}

export async function POST(request: NextRequest) {

}