import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {editorRequestsServiceMockFactory, MockType, repositoryMockFactory} from '../helpers/testUtils';
import {Repository} from 'typeorm';
import {EditorRequestsService} from '../editor-requests/editor-requests.service';
import {CreateUserDto} from './dto/create-user.dto';
import {BadRequestException} from '@nestjs/common';
import {getHashedPassword} from '../helpers/passwordHelper';

describe('UsersService', () => {
    let service: UsersService;
    let editorRequestsService: EditorRequestsService;
    let repositoryMock: MockType<Repository<User>>;

    const createUserDto: CreateUserDto = {
        firstName:     'firstName',
        lastName:      'lastName',
        email:         'email@email.email',
        password:      'password',
        requestEditor: false
    };
    const loginUserDto                 = {
        email:    'email@email.email',
        password: 'password'
    };
    const userDto                      = {
        id:           1,
        firstName:    'firstName',
        lastName:     'lastName',
        email:        'email@email.email',
        password:     'password',
        isAdmin:      false,
        hashPassword: () => {}
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {provide: getRepositoryToken(User), useFactory: repositoryMockFactory},
                {provide: EditorRequestsService, useFactory: editorRequestsServiceMockFactory},
            ],
        }).compile();

        service               = module.get<UsersService>(UsersService);
        repositoryMock        = module.get(getRepositoryToken(User));
        editorRequestsService = module.get(EditorRequestsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an user, if he does not exist', async () => {
            repositoryMock.findOne.mockReturnValue(null);
            const savedUser = await service.create(createUserDto);
            expect(savedUser).toEqual(createUserDto);
        });

        it('should throw an error while creating an user, when he already exists', async () => {
            repositoryMock.findOne.mockReturnValue({});
            try {
                await service.create(createUserDto);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });

        it('should create an editor request, if requestEditor property is true', async () => {
            repositoryMock.findOne.mockReturnValue(null);
            const userWithRequestEditor = {...createUserDto, requestEditor: true};
            await service.create(userWithRequestEditor);
            expect(editorRequestsService.create).toBeCalledWith(
                expect.objectContaining(
                    {user: userWithRequestEditor}
                )
            );
        });
    });

    describe('login', () => {
        it('error should be thrown, if user does not exist', async () => {
            repositoryMock.findOne.mockReturnValue(null);
            try {
                await service.login(loginUserDto);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });

        it('error should be thrown, if user\'s password is not same as stored', async () => {
            repositoryMock.findOne.mockReturnValue({password: 'wrong password'});
            try {
                await service.login(loginUserDto);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(BadRequestException);
            }
        });

        it('user should be returned, if he exists and password is correct', async () => {
            const foundUser = {password: getHashedPassword(loginUserDto.password)};
            repositoryMock.findOne.mockReturnValue(foundUser);

            const response = await service.login(loginUserDto);
            expect(response).toEqual(foundUser);
        });
    });

    describe('updateEditorPermissions', () => {
        it('editor request should be removed', async () => {
            const requestId = 1;
            await service.updateEditorPermissions(requestId, {approve: true});
            expect(editorRequestsService.remove).toBeCalledWith(requestId);
        });

        it('user should be updated and become admin if approve is true', async () => {
            repositoryMock.findOne.mockReturnValue(userDto);
            await service.updateEditorPermissions(1, {approve: true});
            expect(repositoryMock.create).toBeCalledWith({isAdmin: true});
        });

        it('user should not be updated and become admin if approve is false', async () => {
            repositoryMock.findOne.mockReturnValue(userDto);
            await service.updateEditorPermissions(1, {approve: false});
            expect(repositoryMock.create).toBeCalledTimes(0);
        });
    });

    describe('giveEditorsPermissions', () => {
        it('editor permissions should be given to passed user', async () => {
            const updatedUser = await service.giveEditorsPermissions(userDto);
            expect(updatedUser).toEqual({...userDto, isAdmin: true});
        });
    });
});
