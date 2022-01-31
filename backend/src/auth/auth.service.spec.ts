import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from '../users/users.service';
import {JwtModule} from '@nestjs/jwt';
import {editorRequestsServiceMockFactory, MockType, userServiceMockFactory} from '../helpers/testUtils';
import {EditorRequestsService} from '../editor-requests/editor-requests.service';
import {extractUserView} from '../helpers/utils';
import {User} from '../users/entities/user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let editorRequestsServiceMock: EditorRequestsService;
    let usersServiceMock: MockType<UsersService>;

    const signUpDto = {
        firstName:     'first name',
        lastName:      'last name',
        email:         'email@email.com',
        password:      '123!@#asdASD',
        requestEditor: false,
    };
    const signInDto = {
        email:    'email@email.com',
        password: '123!@#asdASD',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {provide: UsersService, useFactory: userServiceMockFactory},
                {provide: EditorRequestsService, useFactory: editorRequestsServiceMockFactory},
            ],
            imports: [
                JwtModule.register({
                    secret: 'secret',
                })
            ],
        }).compile();

        service                   = module.get<AuthService>(AuthService);
        editorRequestsServiceMock = module.get<EditorRequestsService>(EditorRequestsService);
        usersServiceMock          = module.get(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('signUp', () => {
        it('should return token', async () => {
            expect((await service.signUp(signUpDto)).token).toBeDefined();
        });

        it('should return user view', async () => {
            const mockReturnValue = {
                id:           1,
                firstName:    signUpDto.firstName,
                lastName:     signUpDto.lastName,
                email:        signUpDto.email,
                password:     signUpDto.password,
                isAdmin:      false,
                hashPassword: null
            };
            usersServiceMock.create.mockReturnValue(Promise.resolve(mockReturnValue));

            const {token, ...returnedUser} = await service.signUp(signUpDto);
            expect(returnedUser).toEqual(extractUserView(returnedUser as User));
        });

        it('should call create user service', async () => {
            await service.signUp(signUpDto);
            expect(usersServiceMock.create).toBeCalledWith(signUpDto);
        });
    });

    describe('signIn', () => {
        it('should return token', async () => {
            expect((await service.signIn(signInDto)).token).toBeDefined();
        });

        it('should return user view', async () => {
            const mockReturnValue = {
                id:           1,
                firstName:    signUpDto.firstName,
                lastName:     signUpDto.lastName,
                email:        signUpDto.email,
                password:     signUpDto.password,
                isAdmin:      false,
                hashPassword: null
            };
            usersServiceMock.login.mockReturnValue(Promise.resolve(mockReturnValue));

            const {token, ...returnedUser} = await service.signIn(signInDto);
            expect(returnedUser).toEqual(extractUserView(returnedUser as User));
        });

        it('should call login user service', async () => {
            await service.signIn(signInDto);
            expect(usersServiceMock.login).toBeCalledWith(signInDto);
        });
    });
});
