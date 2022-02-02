import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {UsersService} from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Secret',
        });
    }

    async validate(payload) {
        const user = await this.usersService.findOneByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
