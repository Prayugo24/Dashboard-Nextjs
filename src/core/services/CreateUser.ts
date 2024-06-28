import { IUserRepository } from '@/core/domain/contracts/IUserRepository';
import { User } from '@/core/domain/entities/User';

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: any): Promise<User> {
    const user = new User(
      userData.id,
      userData.username,
      userData.email,
      userData.password,
      userData.phone,
      userData.address,
      userData.isAdmin,
      userData.isActive
    );
    return this.userRepository.save(user);
  }
}