import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignUpDto} from './dto/sign-up.dto';
import {IAuthResponse} from './interfaces/IAuthResponse';
import {SignInDto} from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<IAuthResponse> {
        return this.authService.signUp(signUpDto);
    }

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto): Promise<IAuthResponse> {
        return this.authService.signIn(signInDto);
    }
}
