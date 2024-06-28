import { IUserRepository } from '@/contracts/IUserRepository';

export class SearchUsers {
  constructor(private userRepository: IUserRepository) {}

  async execute(searchQ: string, page: number) {
    return this.userRepository.searchUsers(searchQ, page);
  }
}