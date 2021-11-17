import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { LoginUserDTO } from 'src/user/dto/login_user.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from './interfaces/jwt_payload.interface';
import { ILoginStatus } from './interfaces/login_status.interface';
import { IRegistrationStatus } from './interfaces/registration_status.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async register(createdUserDTO: CreateUserDTO): Promise<IRegistrationStatus>{

        let status: IRegistrationStatus = {
                success: true,
                message: 'user registered'
        };

        try{
            await this.userService.createUser(createdUserDTO);
        }catch(err){
            status = {
                success: false,
                message: err
            };
        }

        return status;
    }

    async login(loginUserDTO: LoginUserDTO): Promise<ILoginStatus>{
        
        const user = await this.userService.getUserByCredentials(loginUserDTO);

        const expireIn = process.env.EXPIRES_IN;
        const accessToken = this.jwtService.sign(user);

        let token: ILoginStatus = {
            username: user.username,
            expireIn,
            accessToken
        };

        return token;
    }

    async validateUser(payload: IJwtPayload): Promise<UserDTO>{

        const user = await this.userService.findByPayload(payload);

        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

}


