import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from '../users/users.service';
import {MockType, userServiceMockFactory} from '../helpers/testUtils';
import {JwtStrategy} from './jwt.strategy';
import {UnauthorizedException} from '@nestjs/common';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let usersServiceMock: MockType<UsersService>;

    const email   = 'email@email.com';
    const userDto = {
        id:           1,
        firstName:    'firstName',
        lastName:     'lastName',
        email:        email,
        password:     'password',
        isAdmin:      false,
        hashPassword: () => {}
    };

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
        it('should return user\'s email if user exists', async () => {
            usersServiceMock.findOneByEmail.mockReturnValue(userDto);
            expect(await jwtStrategy.validate({email})).toEqual({login: email});
        });

        it('should throw error when user does not exist', async () => {
            usersServiceMock.findOneByEmail.mockReturnValue(null);
            try {
                await jwtStrategy.validate({email});
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(UnauthorizedException);
            }
        });
    });
});
