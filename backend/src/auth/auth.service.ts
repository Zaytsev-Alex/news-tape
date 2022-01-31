import {Injectable} from '@nestjs/common';
import {SignUpDto} from './dto/sign-up.dto';
import {UsersService} from '../users/users.service';
import {SignInDto} from './dto/sign-in.dto';
import {JwtService} from '@nestjs/jwt';
import {extractUserView} from '../helpers/utils';
import {IAuthResponse} from './interfaces/IAuthResponse';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signUp(signUpDto: SignUpDto): Promise<IAuthResponse> {
        const user  = await this.usersService.create(signUpDto);
        const token = this.generateToken({email: user.email});
        return {token, ...extractUserView(user)};
    }

    async signIn(signInDto: SignInDto): Promise<IAuthResponse> {
        const user  = await this.usersService.login(signInDto);
        const token = this.generateToken({email: user.email});
        return {token, ...extractUserView(user)};
    }

    private generateToken(data): string {
        return this.jwtService.sign(data);
    }
}
