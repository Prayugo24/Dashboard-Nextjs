import { connectToDB } from "@/app/lib/utils"
import { User } from '@/app/lib/models';
export interface IDetailUser {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  isAdmin: boolean;
  isActive: boolean;
}

export const fetchUser = async (id: string): Promise<IDetailUser | null> => {
  try {
    await connectionDb();
    const user: IDetailUser | null = await User.findById(id).lean().exec(); // .lean() untuk meningkatkan performa jika Anda hanya membaca data
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user by id!");
  }
};

export interface IUpdateUser {
    id:string
    username:string
}

export const updateUsers = async (user: IUpdateUser) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
  
      // Memperbarui data dengan SWR
      mutate(`http://localhost:3000/api/users/${user.id}`);
  
      // Melakukan redirect
      const router = useRouter();
      router.push('/dashboard/users');
  
      // Mengembalikan respons dari pembaruan
      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  export const deleteUsers = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to delete user: ${errorDetails.message || response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }