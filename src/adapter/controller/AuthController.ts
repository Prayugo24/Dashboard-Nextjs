
import { IAuthService } from '@/core/domain/contracts/IAuthService';
import { NextRequest, NextResponse } from 'next/server';
import { ReqAuth } from '@/core/domain/entities/AuthUser';
import { ApplicationException } from '@/adapter/exceptions/ApplicationException';

class AuthController {
    constructor(private authService: IAuthService) {}
    
    login = async (req: NextRequest) => {
        try {
            const { username, password } = await req.json();
            const request = {
                username,
                password
            } as unknown as ReqAuth
            const user = await this.authService.login(request);
            return NextResponse.json({ status: 200, message:"Success Login",data:{email:user?.email, token:user?.token}});
        } catch (error) {
             if (error instanceof ApplicationException) {
                return  NextResponse.json({
                    status: error.status,
                    message: error.message,
                    errorCode: error.errorCode,
                    errors: error.errors
                }, { status: error.errorCode });
            }
            
            return NextResponse.json({
                message: "Internal Server Error",
                errorCode: 'UnknownError'
            }, { status: 500 });
        }
    }
    
  }

export default AuthController;
