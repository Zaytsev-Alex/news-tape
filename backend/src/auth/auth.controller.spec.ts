import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersService} from '../users/users.service';
import {userServiceMockFactory} from '../helpers/testUtils';
import {JwtModule} from '@nestjs/jwt';
import {SignUpDto} from './dto/sign-up.dto';
import {SignInDto} from './dto/sign-in.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const signUpDto = new SignUpDto();
    const signInDto = new SignInDto();

    const authResponseMock = {
        id:        1,
        firstName: signUpDto.firstName,
        lastName:  signUpDto.lastName,
        email:     signUpDto.email,
        isAdmin:   false,
        token:     'token'
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {provide: UsersService, useFactory: userServiceMockFactory},
            ],
            imports: [
                JwtModule.register({
                    secret: 'secret',
                })
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service    = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('signUp', () => {
        it('should return auth response', async () => {
            jest.spyOn(service, 'signUp').mockReturnValue(Promise.resolve(authResponseMock));
            expect(await controller.signUp(signUpDto)).toEqual(authResponseMock);
        });
    });

    describe('signIn', () => {
        it('should return auth response', async () => {
            jest.spyOn(service, 'signIn').mockReturnValue(Promise.resolve(authResponseMock));
            expect(await controller.signIn(signInDto)).toEqual(authResponseMock);
        });
    });
});
