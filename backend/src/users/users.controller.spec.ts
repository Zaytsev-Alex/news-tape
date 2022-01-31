import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {editorRequestsServiceMockFactory, MockType, repositoryMockFactory} from '../helpers/testUtils';
import {Repository} from 'typeorm';
import {EditorRequestsService} from '../editor-requests/editor-requests.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    let repositoryMock: MockType<Repository<User>>;

    const userViewMock = {
        id:        1,
        firstName: 'first name',
        lastName:  'last name',
        email:     'email@email.com',
        isAdmin:    false
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {provide: EditorRequestsService, useFactory: editorRequestsServiceMockFactory},
                {provide: getRepositoryToken(User), useFactory: repositoryMockFactory},
            ],
        }).compile();

        controller     = module.get<UsersController>(UsersController);
        service        = module.get<UsersService>(UsersService);
        repositoryMock = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('update', () => {
        it('should return user',  async() => {
            jest.spyOn(service, 'updateEditorPermissions').mockReturnValue(Promise.resolve(userViewMock));
            expect(await controller.update('1', {approve: false})).toEqual(userViewMock);
        });
    });
});
