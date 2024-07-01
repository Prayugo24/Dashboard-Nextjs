
import { IAuthService } from '@/core/domain/contracts/IAuthService';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from '@/config/session';

class AuthController {
    constructor(private authService: IAuthService) {}
  
    login = async (req: NextApiRequest, res: NextApiResponse) => {
      const { username, password } = req.body;
  
      const user = await this.authService.login(username, password);
  
      if (user) {
        req.session.user = { id: user.id, admin: user.isAdmin };
        await req.session.save();
        res.status(200).json({ message: 'Logged in successfully' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  }

export default AuthController;
