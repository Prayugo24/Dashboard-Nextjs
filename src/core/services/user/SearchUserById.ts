import { IUserRepository } from '@/contracts/IUserRepository';

export class SearchUsersById {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    return this.userRepository.findById(userId);
  }
}