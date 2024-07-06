import { IUserRepository } from '@/contracts/IUserRepository';

export class DeleteUserById {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    return this.userRepository.deleteById(userId);
  }
}