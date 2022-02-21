import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from '../users/users.service';
import {MockType, userServiceMockFactory} from '../helpers/testUtils';
import {JwtStrategy} from './jwt.strategy';
import {UnauthorizedException} from '@nestjs/common';
import {User} from '../users/entities/user.entity';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let usersServiceMock: MockType<UsersService>;

    const email   = 'email@email.com';
    const userDto = new User();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                {provide: UsersService, useFactory: userServiceMockFactory},
            ]
        }).compile();

        jwtStrategy      = module.get<JwtStrategy>(JwtStrategy);
        usersServiceMock = module.get(UsersService);
    });

    it('should be defined', () => {
        expect(JwtStrategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return user if he exists', async () => {
            usersServiceMock.findOneByEmail.mockReturnValue(userDto);
            expect(await jwtStrategy.validate({email})).toEqual(userDto);
        });

        it('should throw error when user does not exist', async () => {
            usersServiceMock.findOneByEmail.mockReturnValue(null);
            await expect(
                async () => await jwtStrategy.validate({email})
            ).rejects.toThrowError(UnauthorizedException);
        });
    });
});
