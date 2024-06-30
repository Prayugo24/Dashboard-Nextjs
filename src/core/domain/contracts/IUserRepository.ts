import { User } from '@/core/domain/entities/User';

export interface IUserRepository {
  findUser(keyword: string | RegExp, page: number,itemPerPage:number): Promise<{ counts: number; users: User[] }>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
}