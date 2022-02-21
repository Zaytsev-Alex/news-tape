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
import {LoginUserDto} from './dto/login-user.dto';

describe('UsersService', () => {
    let service: UsersService;
    let editorRequestsService: MockType<EditorRequestsService>;
    let repositoryMock: MockType<Repository<User>>;

    const createUserDto           = new CreateUserDto();
    const loginUserDto            = {
        ...new LoginUserDto(),
        email:    'email@email.email',
        password: 'password'
    };
    const userDto                 = {...new User(), id: 1,};
    const affectedRowsWhileUpdate = 1;

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

        repositoryMock.update.mockReturnValue({affected: affectedRowsWhileUpdate});
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

            await expect(
                async () => await service.create(createUserDto)
            ).rejects.toThrowError(BadRequestException);
        });

        it('should create an editor request, if requestEditor property is true', async () => {
            repositoryMock.findOne.mockReturnValue(null);
            const userWithRequestEditor = {...createUserDto, requestEditor: true};
            await service.create(userWithRequestEditor);
            expect(editorRequestsService.createAndSave).toBeCalledWith(
                expect.objectContaining(
                    {user: userWithRequestEditor}
                )
            );
        });
    });

    describe('login', () => {
        it('error should be thrown, if user does not exist', async () => {
            repositoryMock.findOne.mockReturnValue(null);

            await expect(
                async () => await service.login(loginUserDto)
            ).rejects.toThrowError(BadRequestException);
        });

        it('error should be thrown, if user\'s password is not same as stored', async () => {
            repositoryMock.findOne.mockReturnValue({password: 'wrong password'});

            await expect(
                async () => await service.login(loginUserDto)
            ).rejects.toThrowError(BadRequestException);
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
            editorRequestsService.findOneById.mockReturnValue({user: userDto, id: 1});
            await service.updateEditorPermissions(1, {approve: true});
            expect(repositoryMock.update).toBeCalledWith(1, {isAdmin: true});
        });

        it('user should not be updated and become admin if approve is false', async () => {
            repositoryMock.findOne.mockReturnValue(userDto);
            await service.updateEditorPermissions(1, {approve: false});
            expect(repositoryMock.create).toBeCalledTimes(0);
        });

        it('error should be thrown when there is no such request', async () => {
            editorRequestsService.findOneById.mockReturnValue(null);

            await expect(
                async () => await service.updateEditorPermissions(1, {approve: false})
            ).rejects.toThrowError(BadRequestException);
        });
    });

    describe('giveEditorsPermissions', () => {
        it('should call update method with corresponding data', async () => {
            await service.giveEditorsPermissions(userDto as User);
            expect(repositoryMock.update).toBeCalledWith(1, {isAdmin: true});
        });

        it('should return number of affected rows', async () => {
            expect(await service.giveEditorsPermissions(userDto as User)).toBe(affectedRowsWhileUpdate);
        });
    });
});
