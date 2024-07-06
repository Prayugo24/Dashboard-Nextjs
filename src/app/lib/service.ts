import { AuthUser } from "@/core/domain/entities/AuthUser";
import axios from "axios";
import Cookies from "js-cookie";
import { signIn } from "../auth";

export class authApi {
    static async login(username:string, password:string):Promise<AuthUser | null> {
        try {
            const response = await axios.post('/api/auth',{username,password}) 
            return response.data?.data; // Pastikan format data sesuai dengan yang diharapkan
        } catch (error) {
            console.error('Login API error:', error);
            return null;
        }
    }
}

export const authenticate = async (prevState:any, formData:any) => {
    const { username, password } = Object.fromEntries(formData);
    try {
      await signIn("credentials", { username, password });
    } catch (err:any) {
      if (err.message.includes("CredentialsSignin")) {
        return "Wrong Credentials";
      }
      throw err;
    }
};

export class UserApi {
  static async getAllUsers(keyword: string, page:string):Promise<any> {
    try {
      const response = await axios.get('/api/dashboard/users', {
        params: {
          keyword,
          page
        },
        headers: {
          'Authorization': 'Bearer yourTokenHere', 
          'Content-Type': 'application/json' 
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  static async findUsersByID(userId: string):Promise<any> {
    try {
      const response = await axios.get(`/api/dashboard/users/${userId}`)
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  static async updateUsers():Promise<any> {
    try {
      
    } catch (error) {
      
    }
  }

  static async addUsers():Promise<any> {
    try {
      
    } catch (error) {
      
    }
  }

  static async deleteUsersById():Promise<any> {
    try {
      
    } catch (error) {
      
    }
  }
}