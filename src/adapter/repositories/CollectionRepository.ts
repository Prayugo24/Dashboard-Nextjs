import { IUserRepository } from "@/contracts/IUserRepository";
import { RepoCollection } from "@/core/domain/contracts/IRepoCollection";
import { UserRepository } from '@/repositories/UserRepository';

export function CollectionRepository(): RepoCollection {
    const userRepository: IUserRepository = new UserRepository();
    return {
        userRepository
    }   
}