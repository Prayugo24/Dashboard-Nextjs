import { User } from '@/core/domain/entities/User';

export interface IUserRepository {
  searchUsers(searchQ: string, page: number): Promise<{ count: number; users: User[] }>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
}