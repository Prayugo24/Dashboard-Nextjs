import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/utils/jwtHelpers';
import AuthController from '@/controller/AuthController';
import { AuthService } from '@/services/AuthService/AuthService';
import { IUserRepository } from '@/core/domain/contracts/IUserRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { CollectionRepository } from '@/repositories/CollectionRepository';
import { RepoCollection } from '@/contracts/IRepoCollection';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const repoCollection: RepoCollection = CollectionRepository()
const { userRepository } = repoCollection

const authService = new AuthService(userRepository)
const authController = new AuthController(authService)

export async function POST(req: NextRequest, res: NextResponse) {
  return await authController.login(req)
}


